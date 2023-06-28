/// <reference types="qs" />
/// <reference types="express" />
import { User } from '@prisma/client';
export declare const boardRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        user: any;
    };
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    create: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>;
        _input_in: {
            name?: string;
            background_type?: "Color" | "Image";
            background_value?: string;
            visibility?: "Public" | "Authorized" | "Private";
        };
        _input_out: {
            name?: string;
            background_type?: "Color" | "Image";
            background_value?: string;
            visibility?: "Public" | "Authorized" | "Private";
        };
        _output_in: {
            id?: string;
        };
        _output_out: {
            id?: string;
        };
    }, unknown>;
    get: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        };
        _input_in: unknown;
        _input_out: unknown;
        _output_in: {
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
        };
        _output_out: {
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
        };
    }, any>;
    update: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>, {
            canEdit: boolean;
            canDelete: boolean;
            canInviteUsers: boolean;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }>;
        _input_in: {
            id?: string;
            name?: string;
            background_type?: "Color" | "Image";
            background_value?: string;
            description?: string;
            closed_at?: string;
            visibility?: "Public" | "Authorized" | "Private";
        };
        _input_out: {
            id?: string;
            name?: string;
            background_type?: "Color" | "Image";
            background_value?: string;
            description?: string;
            closed_at?: string;
            visibility?: "Public" | "Authorized" | "Private";
        };
        _output_in: {
            id?: string;
        };
        _output_out: {
            id?: string;
        };
    }, unknown>;
    find: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>;
        _input_in: unknown;
        _input_out: unknown;
        _output_in: {
            id?: string;
            name?: string;
            background_type?: "Color" | "Image";
            background_value?: string;
        }[];
        _output_out: {
            id?: string;
            name?: string;
            background_type?: "Color" | "Image";
            background_value?: string;
        }[];
    }, unknown>;
    toggleStar: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>;
        _input_in: {
            id?: string;
        };
        _input_out: {
            id?: string;
        };
        _output_in: {
            starred_boards?: {
                id?: string;
                name?: string;
                background_type?: "Color" | "Image";
                background_value?: string;
            }[];
        };
        _output_out: {
            starred_boards?: {
                id?: string;
                name?: string;
                background_type?: "Color" | "Image";
                background_value?: string;
            }[];
        };
    }, unknown>;
    delete: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>, {
            canEdit: boolean;
            canDelete: boolean;
            canInviteUsers: boolean;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }>;
        _input_in: {
            id?: string;
        };
        _input_out: {
            id?: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        id: string;
    }>;
    generateBoard: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                user: any;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>, {
            canEdit: boolean;
            canDelete: boolean;
            canInviteUsers: boolean;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }>;
        _input_in: {
            id?: string;
        };
        _input_out: {
            id?: string;
        };
        _output_in: {
            id?: string;
        };
        _output_out: {
            id?: string;
        };
    }, unknown>;
}>;
