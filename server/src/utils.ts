import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export async function validateToken(token: string) {
    type TokenData = { id: string };
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as TokenData; 
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        return user;
    } catch(e) {
        return null;
    }
}

export function isBoardStarred(starredBoards: Array<{id: string}>, boards: Array<{id:string}>) {
    for (const starredBoard of starredBoards) {
        for (const board of boards) {
            if (starredBoard.id === board.id) {
                return true;
            }
        }
    }
    return false;
}