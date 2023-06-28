// @ts-nocheck
import { TRPCError } from '@trpc/server';
import { prisma } from "../prisma";
import { cardShape } from "../shapes/boardShapes";
import { createRequest, updateRequest } from "../shapes/cardShapes";
import { idShape } from "../shapes/shapes";
import { authorizedProcedure, t } from "../trpc";
import z from 'zod';
import { Configuration, OpenAIApi } from 'openai';

export const cardRouter = t.router({
    create: authorizedProcedure
    .input(createRequest)
    .output(idShape)
    .mutation(async ({ input }) => {
        const list = await prisma.card.create({
            data: {
                name: input.name,
                order: input.order,
                list: {
                    connect: {
                        id: input.list_id
                    }
                }
            },
        })

        return { id: list.id };
    }),
    
    get: authorizedProcedure
    .input(idShape)
    .output(cardShape)
    .query(async ({ input }) => {
        const id = input.id;
        const card = await prisma.card.findUnique({ where: { id } });
        return card;
    }),

    update: authorizedProcedure
    .input(updateRequest)
    .output(idShape)
    .mutation(async ({ input }) => {
        const id = input.id;
        if (!id) throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Card id is required',
        });
        const newData = { ...input };
        delete newData.id;
        const card = await prisma.card.update({
            where: { id },
            data: { ...newData }
        });
        return { id: card.id };
    }),

    delete: authorizedProcedure
    .input(idShape)
    .output(idShape)
    .mutation(async ({ input }) => {
        const id = input.id;
        const card = await prisma.card.delete({ where: { id } });
        return { id: card.id };
    }),

    generateContent: authorizedProcedure
    .input(idShape)
    .output(z.string().default(''))
    .query(async ({ input: { id } }) => {
        const card = await prisma.card.findUnique({ where: { id } });
        const list = await prisma.list.findUnique({ where: { id: card.list_id } });
        const board = await prisma.board.findUnique({ where: { id: list.board_id } });
        const configuration = new Configuration({
            apiKey: import.meta.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ 
                role: 'user',
                content: `Generate content for a card named "${card.name}" on board named "${board.name}" in list named "${list.name}". Your response must match language of list's name. Your response will be parsed, so it must be just raw valid html. You can only use these tags: h1, h2, p, span, code, ol, ul, blockquote, strong, em.`
            }]
        });
        const result = response.data.choices?.at(0)?.message?.content || '';
        return result;
    })
});