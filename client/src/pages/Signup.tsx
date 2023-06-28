// @ts-nocheck
import { useState, useEffect } from "react";
import AuthInput from "../components/AuthInput";
import Logo from '../assets/logo.svg';
import { Link, useLocation } from "wouter";
import MyButton from "../components/MyButton";
import { useAppDispatch } from "../hooks";
import { userActions } from "../redux/userSlice";
import { trpc } from "../trpc";
import toastMe from "../components/MyToaster";
import { getErrorMessage } from "../utils";

type Credentials = {
    login: string;
    password: string;
    passwordConfirm: string;
}

export default function Signup() {

    const dispatch = useAppDispatch();
    const [location, navigate] = useLocation();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    const [credentials, setCredentials] = useState<Credentials>({
        login: '',
        password: '',
        passwordConfirm: '',
    });
    
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value.trim();

        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) { 
        const login = credentials.login.trim();
        const password = credentials.password.trim();
        const passwordConfirm = credentials.passwordConfirm.trim();

        if (!login.length || !password.length || !passwordConfirm.length) return;
        
        try {
            setLoading(true);
            const res = await trpc.auth.signUp.mutate({ login, password, passwordConfirm });
            dispatch(userActions.setUser({ token: res.token }));
            setLoading(false);
            navigate('/');

        } catch(e) {
            setLoading(false);
            const error = e as Error;
            toastMe(getErrorMessage(error.message));
        }
    }

    return (
        <div className="canvas grid place-items-center arial-page">
            <div className="flex flex-col items-center bg-white p-8 rounded w-full max-w-xs">
                <Link to="/">
                    <div className="cursor-pointer mb-10 relative grid place-items-center logo-shadow-box">
                        <Logo className="block z-[3]" />
                        <div className={`absolute z-[2] logo-shadow w-[1px] h-[1px] bg-primary-500`} />
                    </div>
                </Link>
                <span className="block mb-4 text-xl font-medium">Create an Account</span>
                <span className="block mb-6">Already have one?{` `}<Link className="link" to="/login">Log in</Link></span>
                <form className="w-full" onSubmit={e => {e.preventDefault();}}>
                    <div className="mb-4">
                        <AuthInput 
                        tabIndex={1}
                        className="w-full"
                        name="login"
                        label="Login"
                        onChange={handleChange}
                        placeholder="Enter your login"
                        value={credentials['login']}
                        required={true}
                        loading={loading}
                        errorMessage="👋 Login is required"
                        />
                    </div>
                    <div className="mb-3">
                        <AuthInput 
                        tabIndex={2}
                        className="w-full"
                        name="password"
                        label="Password"
                        loading={loading}
                        onChange={handleChange}
                        placeholder="Your password"
                        value={credentials['password']}
                        type="password"
                        required={true}
                        errorMessage="👋 Password is required"
                        />
                    </div>
                    <div className="mb-6">
                        <AuthInput 
                        tabIndex={3}
                        className="w-full"
                        name="passwordConfirm"
                        label="Confirm"
                        loading={loading}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        value={credentials['passwordConfirm']}
                        type="password"
                        required={true}
                        errorMessage="👋 Confirmation is required"
                        />
                    </div>
                    <MyButton
                    type="submit"
                    tabIndex={4}
                    className="h-9 w-full"
                    style="solid"  
                    loading={loading}
                    onClick={handleSubmit}
                    text="Log in" />
                </form>
            </div>
        </div>
    );
}