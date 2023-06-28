/// <reference types="qs" />
/// <reference types="express" />
export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        user: any;
    };
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    auth: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>, {
        signUp: import("@trpc/server").BuildProcedure<"mutation", {
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
                token?: string;
            };
            _output_out: {
                token?: string;
            };
        }, unknown>;
        login: import("@trpc/server").BuildProcedure<"query", {
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
                token?: string;
            };
            _output_out: {
                token?: string;
            };
        }, unknown>;
    }>;
    user: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            user: any;
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>, {
        getProfile: import("@trpc/server").BuildProcedure<"query", {
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
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: unknown;
            _output_out: unknown;
        }, {
            id: string;
            notifications: {
                type: import(".prisma/client").NotificationType;
                id: string;
                content: string;
                status: import(".prisma/client").NotificationStatus;
                created_at: Date;
            }[];
            login: string;
            created_at: Date;
            avatar_name: string;
            preferred_theme: import(".prisma/client").Theme;
        }>;
        getBoards: import("@trpc/server").BuildProcedure<"query", {
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
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: unknown;
            _output_out: unknown;
        }, {
            last_accessed: Date;
            starred: boolean;
            id: string;
            name: string;
            starred_by_users: {
                id: string;
            }[];
            background_value: string;
            background_type: import(".prisma/client").BackgroundType;
            closed_at: Date;
        }[]>;
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
            _input_in: unknown;
            _input_out: unknown;
            _output_in: unknown;
            _output_out: unknown;
        }, {
            preferred_theme: import(".prisma/client").Theme;
        }>;
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
            _input_in: unknown;
            _input_out: unknown;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            id: string;
        }>;
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
                user: import(".prisma/client").User;
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            }>;
            _input_in: unknown;
            _input_out: unknown;
            _output_in: unknown;
            _output_out: unknown;
        }, {
            id: string;
            login: string;
            avatar_name: string;
        }[]>;
    }>;
    board: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
                user: import(".prisma/client").User;
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
                user: import(".prisma/client").User;
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
                user: import(".prisma/client").User;
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
                user: import(".prisma/client").User;
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
    list: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
    card: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
}>;
export type AppRouter = typeof appRouter;
