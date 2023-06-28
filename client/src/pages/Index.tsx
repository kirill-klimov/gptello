import { useLocation } from "wouter";
import { useAppSelector } from "../hooks";

export default function Index() {

    const user = useAppSelector(state => state.user);
    const [location, navigate] = useLocation();

    if (user.token) {
        navigate('/boards')
    } else {
        navigate('/login')
    }

    return (
        <></>
    );
} 