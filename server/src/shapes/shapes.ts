import { z } from "zod";

export const idShape = z.object({ id: z.string().uuid() });