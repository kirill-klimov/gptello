import { t } from "../trpc";
import { authRouter } from "./authRouter";
import { boardRouter } from "./boardRouter";
import { cardRouter } from "./cardRouter";
import { listRouter } from "./listRouter";
import { userRouter } from "./userRouter";

export const appRouter = t.router({
    auth: authRouter,
    user: userRouter,
    board: boardRouter,
    list: listRouter,
    card: cardRouter,
})

export type AppRouter = typeof appRouter;

