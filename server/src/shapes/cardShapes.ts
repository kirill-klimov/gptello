import { z } from "zod";

export const createRequest = z.object({
    list_id: z.string().uuid(),
    name: z.string().nonempty(),
    order: z.number().min(0),
});

export const updateRequest = z.object({
    id: z.string().uuid(),
    name: z.string().nonempty(),
    order: z.number().min(0),
    content: z.string(),
    list_id: z.string().uuid(),
}).partial();