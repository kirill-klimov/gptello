import { z } from 'zod';
export declare const createRequest: z.ZodObject<{
    name: z.ZodString;
    order: z.ZodNumber;
    board_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    order?: number;
    board_id?: string;
}, {
    name?: string;
    order?: number;
    board_id?: string;
}>;
export declare const updateRequest: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    order?: number;
}, {
    id?: string;
    name?: string;
    order?: number;
}>;
