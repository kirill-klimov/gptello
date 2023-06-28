export declare function validateToken(token: string): Promise<import(".prisma/client").User>;
export declare function isBoardStarred(starredBoards: Array<{
    id: string;
}>, boards: Array<{
    id: string;
}>): boolean;
