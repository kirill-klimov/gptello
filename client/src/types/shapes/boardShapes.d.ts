import { z } from "zod";
export declare const createRequest: z.ZodObject<{
    name: z.ZodString;
    background_type: z.ZodEnum<["Image", "Color"]>;
    background_value: z.ZodString;
    visibility: z.ZodOptional<z.ZodEnum<["Authorized", "Private", "Public"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
    visibility?: "Public" | "Authorized" | "Private";
}, {
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
    visibility?: "Public" | "Authorized" | "Private";
}>;
export declare const cardShape: z.ZodObject<{
    list_id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    id: z.ZodString;
    name: z.ZodString;
    order: z.ZodNumber;
    content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    list_id?: string;
    created_at?: Date;
    updated_at?: Date;
    id?: string;
    name?: string;
    order?: number;
    content?: string;
}, {
    list_id?: string;
    created_at?: Date;
    updated_at?: Date;
    id?: string;
    name?: string;
    order?: number;
    content?: string;
}>;
export declare const listShape: z.ZodObject<{
    board_id: z.ZodString;
    cards: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        list_id: z.ZodString;
        created_at: z.ZodDate;
        updated_at: z.ZodDate;
        id: z.ZodString;
        name: z.ZodString;
        order: z.ZodNumber;
        content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        list_id?: string;
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
        content?: string;
    }, {
        list_id?: string;
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
        content?: string;
    }>, "many">>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    id: z.ZodString;
    name: z.ZodString;
    order: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    board_id?: string;
    cards?: {
        list_id?: string;
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
        content?: string;
    }[];
    created_at?: Date;
    updated_at?: Date;
    id?: string;
    name?: string;
    order?: number;
}, {
    board_id?: string;
    cards?: {
        list_id?: string;
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
        content?: string;
    }[];
    created_at?: Date;
    updated_at?: Date;
    id?: string;
    name?: string;
    order?: number;
}>;
export declare const getResponse: z.ZodObject<{
    starred: z.ZodOptional<z.ZodBoolean>;
    users_on_boards: z.ZodOptional<z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["EDITOR", "OWNER"]>;
        created_at: z.ZodDate;
        user: z.ZodObject<{
            id: z.ZodString;
            login: z.ZodString;
            avatar_name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            login?: string;
            avatar_name?: string;
        }, {
            id?: string;
            login?: string;
            avatar_name?: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        role?: "OWNER" | "EDITOR";
        created_at?: Date;
        user?: {
            id?: string;
            login?: string;
            avatar_name?: string;
        };
    }, {
        role?: "OWNER" | "EDITOR";
        created_at?: Date;
        user?: {
            id?: string;
            login?: string;
            avatar_name?: string;
        };
    }>, "many">>;
    lists: z.ZodOptional<z.ZodArray<z.ZodObject<{
        board_id: z.ZodString;
        cards: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            list_id: z.ZodString;
            created_at: z.ZodDate;
            updated_at: z.ZodDate;
            id: z.ZodString;
            name: z.ZodString;
            order: z.ZodNumber;
            content: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        }, {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        }>, "many">>>;
        created_at: z.ZodDate;
        updated_at: z.ZodDate;
        id: z.ZodString;
        name: z.ZodString;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        board_id?: string;
        cards?: {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        }[];
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
    }, {
        board_id?: string;
        cards?: {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        }[];
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
    }>, "many">>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    id: z.ZodString;
    name: z.ZodString;
    background_type: z.ZodEnum<["Image", "Color"]>;
    background_value: z.ZodString;
    visibility: z.ZodEnum<["Authorized", "Public", "Private"]>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    closed_at: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    starred?: boolean;
    users_on_boards?: {
        role?: "OWNER" | "EDITOR";
        created_at?: Date;
        user?: {
            id?: string;
            login?: string;
            avatar_name?: string;
        };
    }[];
    lists?: {
        board_id?: string;
        cards?: {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        }[];
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
    }[];
    created_at?: Date;
    updated_at?: Date;
    id?: string;
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
    visibility?: "Public" | "Authorized" | "Private";
    description?: string;
    closed_at?: Date;
}, {
    starred?: boolean;
    users_on_boards?: {
        role?: "OWNER" | "EDITOR";
        created_at?: Date;
        user?: {
            id?: string;
            login?: string;
            avatar_name?: string;
        };
    }[];
    lists?: {
        board_id?: string;
        cards?: {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        }[];
        created_at?: Date;
        updated_at?: Date;
        id?: string;
        name?: string;
        order?: number;
    }[];
    created_at?: Date;
    updated_at?: Date;
    id?: string;
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
    visibility?: "Public" | "Authorized" | "Private";
    description?: string;
    closed_at?: Date;
}>;
export declare const updateRequest: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    background_type: z.ZodOptional<z.ZodEnum<["Image", "Color"]>>;
    background_value: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    closed_at: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<["Authorized", "Private", "Public"]>>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
    description?: string;
    closed_at?: string;
    visibility?: "Public" | "Authorized" | "Private";
}, {
    id?: string;
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
    description?: string;
    closed_at?: string;
    visibility?: "Public" | "Authorized" | "Private";
}>;
export declare const findResponse: z.ZodDefault<z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    background_type: z.ZodEnum<["Image", "Color"]>;
    background_value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
}, {
    id?: string;
    name?: string;
    background_type?: "Color" | "Image";
    background_value?: string;
}>, "many">>;
export declare const toggleStarResponse: z.ZodObject<{
    starred_boards: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        background_type: z.ZodEnum<["Image", "Color"]>;
        background_value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        name?: string;
        background_type?: "Color" | "Image";
        background_value?: string;
    }, {
        id?: string;
        name?: string;
        background_type?: "Color" | "Image";
        background_value?: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    starred_boards?: {
        id?: string;
        name?: string;
        background_type?: "Color" | "Image";
        background_value?: string;
    }[];
}, {
    starred_boards?: {
        id?: string;
        name?: string;
        background_type?: "Color" | "Image";
        background_value?: string;
    }[];
}>;
