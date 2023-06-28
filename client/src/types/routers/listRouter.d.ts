/// <reference types="qs" />
/// <reference types="express" />
export declare const listRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
            user: import(".prisma/client").User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>;
        _input_in: {
            name?: string;
            order?: number;
            board_id?: string;
        };
        _input_out: {
            name?: string;
            order?: number;
            board_id?: string;
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
        _ctx_out: import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: import(".prisma/client").User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>;
        _input_in: {
            id?: string;
        };
        _input_out: {
            id?: string;
        };
        _output_in: {
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
        };
        _output_out: {
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
        };
    }, unknown>;
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
        _ctx_out: import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: import(".prisma/client").User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        }>;
        _input_in: {
            id?: string;
            name?: string;
            order?: number;
        };
        _input_out: {
            id?: string;
            name?: string;
            order?: number;
        };
        _output_in: {
            id?: string;
        };
        _output_out: {
            id?: string;
        };
    }, unknown>;
    clear: import("@trpc/server").BuildProcedure<"mutation", {
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
            user: import(".prisma/client").User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
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
        _ctx_out: import("@trpc/server").Overwrite<{
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        }, {
            user: import(".prisma/client").User;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
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
