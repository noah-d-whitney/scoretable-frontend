'use client';

import {createContext, useContext, useState} from 'react';
import {useRouter} from "next/navigation";
import {scoreTableApiV1} from "@/app/api/scoreTableApiV1";
import {AxiosError} from "axios";

type UserAuthContext = {
    firstName: string,
    lastName: string,
    id: string,
    email: string,
};
const AuthContext = createContext<UserAuthContext | null>(null);
export default function useAuth() {
    const AuthContextData = useContext(AuthContext);
    const [UserAuthDataState, setUserAuthDataState] = useState<UserAuthContext | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const clearError = () => setError(null);
    const api = scoreTableApiV1;
    async function LoginUser(userLoginDto: { email: string, password: string }) {
        try {
            const { email, password } = userLoginDto;
            setError(null);
            setIsLoading(true);
            await api.post('/login?useCookies=true', { email, password });
            const userDataResponse = await api.get('/userdata');
            const userDataState: UserAuthContext = {
                firstName: userDataResponse.data.firstName,
                lastName: userDataResponse.data.lastName,
                id: userDataResponse.data.id,
                email: userDataResponse.data.email,
            };
            console.log(userDataState);
            setUserAuthDataState(userDataState);
            router.push('/home');
            setIsLoading(false);
        } catch (e: any) {
            if (e.response.status === 401) {
                setError('Login failed, please check your email and password.');
            }
            if (e.response.status === 500) {
                setError('Something went wrong, please try again');
            }
        } finally {
            setIsLoading(false);
        }
    }
    return { AuthContext, AuthContextData, UserAuthDataState, LoginUser, isLoading, error, clearError };
}
