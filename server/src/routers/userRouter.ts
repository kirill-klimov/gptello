// @ts-nocheck
import bcrypt from 'bcryptjs';
import z from "zod";
import { prisma } from "../prisma";
import { authorizedProcedure, t } from "../trpc";
import { findResponse, getBoardsResponse, getProfileResponse } from "../shapes/userShapes";
import { Theme } from "@prisma/client";
import { TRPCError } from '@trpc/server';

export const userRouter = t.router({
    getProfile: authorizedProcedure
    .output(getProfileResponse)
    .query(async ({ ctx }) => {
        const id = ctx.user.id;
        const user = await prisma.user.findUnique({ 
            where: { id },
            select: {
                id: true,
                avatar_name: true,
                login: true,
                preferred_theme: true,
                created_at: true,
                notifications: {
                    select: {
                        id: true,
                        content: true,
                        created_at: true,
                        status: true,
                        type: true,
                    }
                },
            },
        });

        return user;
    }),

    getBoards: authorizedProcedure
    .output(getBoardsResponse)
    .query(async ({ ctx }) => {
        const user_id = ctx.user.id;
        const boardList = await prisma.usersOnBoards.findMany({
            where: { 
                user_id, 
                board: {
                    closed_at: {
                        equals: null
                    }
                }
            },
            select: {
                board: {
                    select: {
                        id: true,
                        name: true,
                        background_type: true,
                        background_value: true,
                        closed_at: true,
                        starred_by_users: {
                            select: { id: true }
                        },
                    },
                }
            }
        });
        const lastAccessedList = await prisma.lastAccessedBoardByUser.findMany({
            where: { user_id },
            select: {
                last_accessed: true,
                board: {
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: {
                last_accessed: 'desc'
            },
        });
        const boards = lastAccessedList.map(item => {
            const la = boardList.find(b => b.board.id === item.board.id);
            if (!la) return null;
            const { board } = la;
            const filtered = {
                ...board,
                last_accessed: item.last_accessed,
                starred: !!board.starred_by_users.find(item => item.id === user_id)
            }
            delete filtered.starred_by_users;
            return filtered;
        });

        const filtered = boards.filter(b => b !== null);
        
        return filtered;
    }),

    update: authorizedProcedure
    .input(z.object({ preferred_theme: z.enum([Theme.Dark, Theme.Light]) }))
    .output(z.object({ preferred_theme: z.enum([Theme.Dark, Theme.Light]) }))
    .mutation(async ({ ctx, input }) => {
        const preferred_theme = input.preferred_theme;
        const id = ctx.user.id;
        const user = await prisma.user.update({ 
            where: { id },  
            data: { preferred_theme }
        });

        return { preferred_theme: user.preferred_theme };
    }),

    delete: authorizedProcedure
    .input(z.object({ password: z.string().nonempty('Password is required') }))
    .mutation(async ({ ctx, input }) => {
        const id = ctx.user.id;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User not found'
        });
        if (!bcrypt.compareSync(input.password, user.password)) {
            throw new TRPCError({
                message: 'Incorrect password',
                code: 'BAD_REQUEST',
            });
        }
        await prisma.user.delete({ where: { id } });
        return { id: user.id };
    }),    

    find: authorizedProcedure
    .input(z.object({ login: z.string().nonempty('Login is required') }))
    .output(findResponse.default([]))
    .query(async ({ input }) => {
        const users = await prisma.user.findMany({ 
            where: {
                login: { startsWith: input.login }
            },
            select: {
                id: true,
                avatar_name: true,
                login: true,
            }
        })
        return users;
    }),
});