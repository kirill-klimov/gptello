// @ts-nocheck
import jwt from 'jsonwebtoken';
import { AnyRouter, TRPCError, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { prisma } from './prisma';
import { BoardRole, User } from '@prisma/client';

export const createContext = ({ req, res } : CreateExpressContextOptions) => {
    return { req, user: undefined };
} 

export const t = initTRPC
.context<typeof createContext>()
.create(); // initialization of backend

const authMiddleware = t.middleware(async ({ ctx, next }) => {
    const token = ctx.req.headers.authorization?.split(' ')[1];

    if (!token) throw new TRPCError({
        message: 'Unauthorized',
        code: "UNAUTHORIZED"
    });

    type TokenData = { id: string };
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenData; 
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user) throw new TRPCError({
        message: 'Invalid token',
        code: 'BAD_REQUEST'
    });

    return next({ ctx: { 
        ...ctx,
        user, 
    }});
}); 

export const authorizedProcedure = t.procedure.use(authMiddleware);


const boardMiddleware = t.middleware(async ({ ctx, next, rawInput}) => {
    const board_id = rawInput['id'] as string;

    const actions = {
        canEdit: false,
        canDelete: false,
        canInviteUsers: false,
    }

    const user = ctx.user as User;  
    if (user) {
        const user_id = user.id;
        const relation = await prisma.usersOnBoards.findUnique({
            where: {
                user_id_board_id: {
                    board_id,
                    user_id
                }
            }
        })
        if (!relation) {
            return next({ ctx: {
                ...ctx,
                ...actions,
            }});
        }
        if (relation.role === BoardRole.OWNER) {
            actions.canDelete = true;
            actions.canEdit = true;
            actions.canInviteUsers = true;
        } else {
            actions.canEdit = true;
        }
    }

    return next({ ctx: {
        ...ctx,
        ...actions,
    }});
});

export const boardProcedure = t.procedure
.use(authMiddleware)
.use(boardMiddleware);