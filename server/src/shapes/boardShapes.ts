import { BoardRole, Visibility, BackgroundType } from "@prisma/client";
import { z } from "zod";

const timestamps = {
    created_at: z.date(),
    updated_at: z.date(),
};

export const createRequest = z.object({ 
    name: z.string().nonempty('Board name is required'),
    background_type: z.enum([BackgroundType.Image, BackgroundType.Color], {
        required_error: 'Board type is required'
    }),
    background_value: z.string().nonempty('Board value is required'),
    visibility: z.enum([Visibility.Authorized, Visibility.Private, Visibility.Public]).optional()
}); 


export const cardShape = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    order: z.number().int(),
    content: z.string().optional().nullable(),
    ...timestamps,
    list_id: z.string().nonempty(),
});

export const listShape = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    order: z.number().int(),
    ...timestamps,
    board_id: z.string().nonempty(),
    cards: z.array(cardShape).optional().default([]),
});

export const getResponse = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    background_type: z.enum([BackgroundType.Image, BackgroundType.Color]),
    background_value: z.string().nonempty(),
    visibility: z.enum([Visibility.Authorized, Visibility.Public, Visibility.Private]),
    description: z.string().optional().nullable(),
    closed_at: z.date().nullable().optional(),
    ...timestamps,

    // starred_by_users: z.array(z.object({
    //     id: z.string().nonempty()
    // })).default([]),
    starred: z.boolean().optional(),
    users_on_boards: z.array(z.object({
        role: z.enum([
            BoardRole.EDITOR,
            BoardRole.OWNER,
        ]),
        created_at: z.date(),
        user: z.object({
            id: z.string().nonempty(),
            login: z.string().nonempty(),
            avatar_name: z.string().nonempty(),
        }),
    })).optional(),
    lists: z.array(listShape).optional(),
});

export const updateRequest = z.object({
    id: z.string().uuid().nonempty(),
    name: z.string().nonempty(),
    background_type: z.enum([BackgroundType.Image, BackgroundType.Color]),
    background_value: z.string().nonempty(),
    description: z.string(),
    closed_at: z.string().datetime(),
    visibility: z.enum([
        Visibility.Authorized,
        Visibility.Private,
        Visibility.Public,
    ]),
}).partial();

export const findResponse = z.array(z.object({
    id: z.string().uuid().nonempty(),
    name: z.string().nonempty(),
    background_type: z.enum([BackgroundType.Image, BackgroundType.Color]),
    background_value: z.string().nonempty(),
})).default([]);

export const toggleStarResponse = z.object({
    starred_boards: z.array(z.object({
        id: z.string().uuid().nonempty(),
        name: z.string().nonempty(),
        background_type: z.enum([BackgroundType.Image, BackgroundType.Color]),
        background_value: z.string().nonempty(),
    })).default([])
});