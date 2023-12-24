'use client';

import {createContext, useContext, useState} from 'react';
import {useRouter} from "next/navigation";
import {scoreTableApiV1} from "@/app/api/scoreTableApiV1";

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
    const router = useRouter();
    const api = scoreTableApiV1;
    async function LoginUser(userLoginDto: { email: string, password: string }) {
        try {
            const { email, password } = userLoginDto;
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
            setIsLoading(false);
            router.push('/home');
        } catch (e) {
            console.log(e);
        }
    }
    return { AuthContext, AuthContextData, UserAuthDataState, LoginUser, isLoading };
}
