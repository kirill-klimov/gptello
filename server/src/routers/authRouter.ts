import { t } from "../trpc";
import * as z from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from "../prisma";
import { userLoginRequest, userSignupRequest } from "../shapes/authShapes";
import { TRPCError } from "@trpc/server";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import jdenticon from "jdenticon";
import fs from "fs";
import path from 'path';

const saltRounds = 3;

export const authRouter = t.router({
    signUp: t.procedure
    .input(userSignupRequest)
    .output(z.object({ token: z.string().nonempty() }))
    .mutation(async ({ input }) => {
        const existingUser = await prisma.user.findUnique({ where: { login: input.login } });
        if (existingUser) {
            throw new TRPCError({
                message: 'User already exists',
                code: 'BAD_REQUEST',
            });
        }
        if (input.password !== input.passwordConfirm) {
            throw new TRPCError({
                message: 'Passwords don\'t match',
                code: 'BAD_REQUEST',
            });
        }

        const png = jdenticon.toPng(input.login, 200);
        const fileName = `${crypto.randomUUID()}.png`;
        const filePath = path.resolve(__dirname, '../resources', fileName);
        fs.writeFileSync(filePath, png);
        

        const hash = bcrypt.hashSync(input.password, bcrypt.genSaltSync(saltRounds));
        const user = await prisma.user.create({ data: {
            login: input.login,
            password: hash,
            avatar_name: fileName,
        }})
        const token = jwt.sign({ id: user.id }, import.meta.env.JWT_SECRET);

        return { token };
    }),

    login: t.procedure
    .input(userLoginRequest)
    .output(z.object({ token: z.string().nonempty() }))
    .query(async ({ input }) => {
        const existingUser = await prisma.user.findUnique({ where: { login: input.login } });
        if (!existingUser) {
            throw new TRPCError({
                message: 'User doesn\'t exists',
                code: 'BAD_REQUEST',
            });
        }
        if (!bcrypt.compareSync(input.password, existingUser.password)) {
            throw new TRPCError({
                message: 'Incorrect password',
                code: 'BAD_REQUEST',
            });
        }

        const token = jwt.sign({ id: existingUser.id }, import.meta.env.JWT_SECRET);

        return { token };
    }),
});