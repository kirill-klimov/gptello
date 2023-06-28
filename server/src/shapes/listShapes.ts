import { z } from 'zod';

export const createRequest = z.object({
    name: z.string().nonempty('List name cannot be empty'),
    order: z.number().min(0, 'List order cannot be negative'),
    board_id: z.string().uuid(),
});

export const updateRequest = z.object({
    id: z.string().uuid(),
    name: z.string().nonempty(),
    order: z.number().min(0)
}).partial();