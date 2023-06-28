/// <reference types="qs" />
/// <reference types="express" />
export declare const cardRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
            list_id?: string;
            name?: string;
            order?: number;
        };
        _input_out: {
            list_id?: string;
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
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
        };
        _output_out: {
            list_id?: string;
            created_at?: Date;
            updated_at?: Date;
            id?: string;
            name?: string;
            order?: number;
            content?: string;
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
            content?: string;
            list_id?: string;
        };
        _input_out: {
            id?: string;
            name?: string;
            order?: number;
            content?: string;
            list_id?: string;
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
    generateContent: import("@trpc/server").BuildProcedure<"query", {
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
        _output_in: unknown;
        _output_out: unknown;
    }, string>;
}>;
