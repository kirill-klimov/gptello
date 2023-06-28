// @ts-nocheck
import { authorizedProcedure, t } from "../trpc";
import { createRequest, updateRequest } from "../shapes/listShapes";
import { prisma } from "../prisma";
import { z } from "zod";
import { idShape } from "../shapes/shapes";
import { listShape } from "../shapes/boardShapes";
import { TRPCError } from "@trpc/server";

export const listRouter = t.router({
    create: authorizedProcedure
    .input(createRequest)
    .output(idShape)
    .mutation(async ({ input }) => {
        const list = await prisma.list.create({
            data: {
                name: input.name,
                order: input.order,
                board: {
                    connect: {
                        id: input.board_id
                    }
                }
            },
        })

        return { id: list.id };
    }),

    // get
    get: authorizedProcedure
    .input(idShape)
    .output(listShape)
    .query(async ({ input }) => {
        const list = await prisma.list.findUnique({ 
            where: { id: input.id },
            select: {
                id: true,
                order: true,
                name: true,
                board_id: true,
                cards: true,
                created_at: true,
                updated_at: true,
            }
        });

        return list;
    }),

    update: authorizedProcedure
    .input(updateRequest)
    .output(idShape)
    .mutation(async ({ input }) => {
        const id = input.id;
        if (!id) throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'List id is required'
        });
        const newData = { ...input };
        delete newData.id;
        const list = await prisma.list.update({
            where: { id },
            data: { ...newData }
        });
        return { id: list.id };
    }),

    clear: authorizedProcedure
    .input(idShape)
    .output(idShape)
    .mutation(async ({ input }) => {
        const id = input.id;
        await prisma.card.deleteMany({
            where: { list_id: id },
        });
        return { id };
    }),

    delete: authorizedProcedure
    .input(idShape)
    .output(idShape)
    .mutation(async ({ input }) => {
        const id = input.id;
        const list = await prisma.list.delete({ where: { id } });
        return { id: list.id };
    })
});