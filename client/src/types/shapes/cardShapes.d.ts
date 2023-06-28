import { z } from "zod";
export declare const createRequest: z.ZodObject<{
    list_id: z.ZodString;
    name: z.ZodString;
    order: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    list_id?: string;
    name?: string;
    order?: number;
}, {
    list_id?: string;
    name?: string;
    order?: number;
}>;
export declare const updateRequest: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    content: z.ZodOptional<z.ZodString>;
    list_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    order?: number;
    content?: string;
    list_id?: string;
}, {
    id?: string;
    name?: string;
    order?: number;
    content?: string;
    list_id?: string;
}>;
