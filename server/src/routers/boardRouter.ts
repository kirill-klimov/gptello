// @ts-nocheck
import { boardProcedure } from './../trpc';
import z from "zod";
import { authorizedProcedure, t } from "../trpc";
import { prisma } from '../prisma';
import { TRPCError } from '@trpc/server';
import { createRequest, findResponse, getResponse, toggleStarResponse, updateRequest } from '../shapes/boardShapes';
import { BoardRole, User } from '@prisma/client';
import { validateToken } from '../utils';
import { idShape } from '../shapes/shapes';
import { Configuration, OpenAIApi } from 'openai';

export const boardRouter = t.router({
    // 1. create
    create: authorizedProcedure
    .input(createRequest)
    .output(idShape)
    .mutation(async ({ ctx, input }) => {
        const user_id = ctx.user.id;
        const board = await prisma.board.create({
            data: {
                name: input.name,
                background_type: input.background_type,
                background_value: input.background_value,
                visibility: input.visibility,
                users_on_boards: {
                    create: {
                        user: {
                            connect: {
                                id: user_id,
                            }
                        },
                        role: BoardRole.OWNER,
                    }
                }
            }
        });

        return { id: board.id };
    }),

    // 2. get
    get: t.procedure
    .input(z.object({ 
        id: z.string().uuid(),
        populate: z.boolean().default(false).optional()
    }))
    .output(getResponse)
    .query(async ({ ctx, input }) => {
        const id = input.id;
        const response = { board: null };

        const board = await prisma.board.findUnique({ where: { id } });

        const token = ctx.req.headers.authorization?.split(' ')[1];
        const user = await validateToken(token);

        if ((board.visibility === 'Private' || board.visibility === 'Authorized') && !user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Unauthorized'
            });
        }

        if (board.visibility === 'Private') {
            const relation = await prisma.usersOnBoards.findUnique({
                where: {
                    user_id_board_id: {
                        board_id: board.id,
                        user_id: user.id
                    }
                }
            });
            if (!relation) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Unauthorized'
                });
            }
        }

        if (board.closed_at) {
            response.board = board;
        } else {
            const selectOptions = input.populate ? selectPopulatedBoard(user) : selectUnpopulatedBoard(user);
            const fetchedBoard = await prisma.board.findUnique({
                where: { id },
                select: selectOptions,
            });
            if (user.id) {
                response.board = {
                   ...fetchedBoard,
                   starred: !!fetchedBoard.starred_by_users.find(u => u.id === user.id)
                };
            } else {
                response.board = { ...fetchedBoard, starred: false };
            }
        }

        if (!response.board) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Board does not exist',
            });
        }

        if (user?.id) {
            const lastAccessed = await prisma.lastAccessedBoardByUser.findUnique({
                where: {
                    user_id_board_id: {
                        board_id: id,
                        user_id: user.id
                    }
                }
            });
            if (lastAccessed) {
                await prisma.lastAccessedBoardByUser.update({
                    where: {
                        user_id_board_id: {
                            board_id: id,
                            user_id: user.id
                        }
                    },
                    data: {
                        last_accessed: new Date(Date.now())
                    }
                })
            } else {
                await prisma.lastAccessedBoardByUser.create({
                    data: {
                        board: {
                            connect: { id }
                        },
                        user: {
                            connect: { id: user.id }
                        },
                        last_accessed: new Date(Date.now())
                    }
                })
            }
        }

        return { ...response.board };
    }),

    // 3. update
    update: boardProcedure
    .input(updateRequest)
    .output(idShape)
    .mutation(async ({ ctx, input }) => {
        const id = input.id;
        if (!id) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Board id is not specified' });

        if (!ctx.canEdit) throw new TRPCError({ code: 'FORBIDDEN', message: 'You\'re not allowed to edit this board' });

        const newData = { ...input };
        delete newData.id;

        const board = await prisma.board.update({
            where: { id },
            data: { ...newData }
        })

        return { id: board.id };
    }),

    // 4. find
    find: authorizedProcedure
    .input(z.object({ name: z.string().nonempty() }))
    .output(findResponse)
    .query(async ({ ctx, input }) => {
        const name = input.name;

        const boards = await prisma.board.findMany({ 
            where: { 
                name: { startsWith: name },
                users: {
                    some: {
                        id: ctx.user.id,
                    }
                } 
            }, 
            select: {
                id: true,
                name: true,
                background_type: true,
                background_value: true,
            }
        });

        return boards;
    }),

    // 5. toggleStar
    toggleStar: authorizedProcedure
    .input(idShape)
    .output(toggleStarResponse)
    .mutation(async ({ ctx, input }) => {
        const id = input.id;
        
        const starredBy = await prisma.board.findUnique({
            where: { id },
            select: {
                starred_by_users: {
                    select: { id: true }
                }
            }
        })

        const isStarred = starredBy.starred_by_users.filter(i => i.id === ctx.user.id);
        const user = await prisma.user.update({
            where: { id: ctx.user.id },
            data: {
                starred_boards: isStarred.length ? 
                { disconnect: { id } } 
                : 
                { connect: { id } }
            },
            select: { 
                starred_boards: {
                    select: {
                        id: true,
                        name: true,
                        background_type: true,
                        background_value: true,
                    }
                }
            }
        });

        return { starred_boards: user.starred_boards };
    }),

    // 6. inviteUser
    // inviteUser: boardProcedure
    // .input(z.object({
    //     id: z.string().uuid(),
    //     to: z.string().uuid(),
    // }))
    // .mutation(async ({ ctx, input }) => {
    //     const id = input.id;
    //     const user_id = (ctx.user as User).id;

    // })

    // 7. acceptInvite
    // 8. removeUser

    // 9. delete
    delete: boardProcedure
    .input(idShape)
    .mutation(async ({ ctx, input }) => {
        const id = input.id;
        if (!ctx.canDelete) throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You\'re not allowed to delete this board'
        });
        const board = await prisma.board.delete({
            where: { id }
        })
        return { id: board.id };
    }),

    generateBoard: boardProcedure
    .input(idShape)
    .output(idShape)
    .mutation(async ({ ctx, input }) => {
        const id = input.id;
        const board = await prisma.board.findUnique({ where: { id } });
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ 
                role: 'user',
                content: `Generate lists and cards for board named "${board.name}". 
                Generated content language must match board's name language. Your response 
                will be parsed, so it must be a raw valid JSON array of lists. "order" 
                property must start at 1. Here is types you will need: 
                type List = { name: string; order: number; cards: Card[]}; 
                type Card = { name: string; order: number };`
            }]
        });
        type ListGenerated = { name: string; order: number; cards: CardGenerated[]}; 
        type CardGenerated = { name: string; order: number };
        const lists = JSON.parse(response.data.choices?.at(0)?.message.content || "[]") as ListGenerated[];
        await prisma.list.deleteMany({ where: { board_id: id } });
        await Promise.all(lists.map(async l => {
            const list = await prisma.list.create({ data: {
                name: l.name,
                order: l.order,
                board: {
                    connect: { id }
                },
            }});
            await Promise.all(l.cards.map(async c => {
                await prisma.card.create({ data: {
                    name: c.name,
                    order: c.order,
                    list: {
                        connect: { id: list.id }
                    }
                }});
            }));
        }));
        return { id };
    })
})

const selectPopulatedBoard = (user: User) => ({
    id: true,
    name: true,
    description: true,
    background_type: true,
    background_value: true,
    closed_at: true,
    created_at: true,
    visibility: true,
    updated_at: true,
    starred_by_users: {
        where: { id: user?.id },
        select: { id: true },
    },
    users_on_boards: {
        select: {
            role: true,
            created_at: true,
            user: {
                select: {
                    id: true,
                    login: true,
                    avatar_name: true,
                }
            }
        }
    },
    lists: {
        orderBy: {
            order: 'asc',
        },
        select: {
            id: true,
            name: true,
            order: true,
            created_at: true,
            updated_at: true,
            board_id: true,
            cards: {
                orderBy: {
                    order: 'asc',
                },
                select: {
                    id: true,
                    name: true,
                    content: true,
                    updated_at: true,
                    created_at: true,
                    list_id: true,
                    order: true,
                }
            },
        }
    }
});

const selectUnpopulatedBoard = (user: User) => ({
    id: true,
    name: true,
    description: true,
    background_type: true,
    background_value: true,
    closed_at: true,
    created_at: true,
    visibility: true,
    updated_at: true,
    starred_by_users: {
        where: { id: user?.id },
        select: { id: true },
    },
});