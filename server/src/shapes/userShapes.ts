import { BackgroundType, NotificationStatus, NotificationType, Theme } from "@prisma/client";
import z from "zod";

export const getProfileResponse = z.object({
    id: z.string().nonempty(),
    avatar_name: z.string().nonempty(),
    login: z.string().nonempty(),
    preferred_theme: z.enum([Theme.Dark, Theme.Light]),
    created_at: z.date(),
    notifications: z.array(z.object({
        id: z.string().nonempty(),
        content: z.string().nonempty(),
        created_at: z.date(),
        status: z.enum([NotificationStatus.Read, NotificationStatus.Unread]),
        type: z.enum([NotificationType.Info, NotificationType.Invite]),
    })).default([]),
});

export const findResponse = z.array(z.object({
    id: z.string().nonempty(),
    avatar_name: z.string().nonempty(),
    login: z.string().nonempty(),
}));

export const getBoardsResponse = z.array(z.object({
    id: z.string().nonempty(),
    background_type: z.enum([BackgroundType.Image, BackgroundType.Color]),
    background_value: z.string().nonempty(),
    name: z.string().nonempty(),
    starred: z.boolean(),
    last_accessed: z.date().nullable().default(null),
})).default([]);