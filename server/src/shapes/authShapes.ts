import z from "zod";

export const userSignupRequest = z.object({
    login: z
    .string({ 
        required_error: "Login cannot be empty",
        invalid_type_error: "Login must be a string",
    })
    .nonempty("Login cannot be empty")
    .max(40, "Login is too long")
    .min(3, "Login is too short"),
    
    password: z
    .string({ 
        required_error: "Password cannot be empty",
        invalid_type_error: "Password must be a string",
    })
    .nonempty("Password cannot be empty")
    .min(3, "Password is too long")
    .max(40, "Password is too long"),

    passwordConfirm: z.string().nonempty(),
})

export const userLoginRequest = z.object({
    login: z
    .string({ 
        required_error: "Login cannot be empty",
        invalid_type_error: "Login must be a string",
    })
    .nonempty("Login cannot be empty"),

    password: z
    .string({ 
        required_error: "Password cannot be empty",
        invalid_type_error: "Password must be a string",
    })
    .nonempty("Password cannot be empty")
})