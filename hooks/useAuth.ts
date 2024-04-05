import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserLoginDto } from '@/app/api/types';
import { scoreTableApiV1 } from '@/app/api/scoreTableApiV1';

export default function useAuth() {
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();

    function clearError() {
        setError(null);
    }

    async function login(user: UserLoginDto) {
        try {
            setError(null);
            setLoading(true);
            await scoreTableApiV1.post('/user/login', user);
            setLoading(false);
            push('/home');
        } catch (e: any) {
            setError('Could not login');
            setLoading(false);
        }
    }

    //TODO add protected routes to middleware
    async function isAuth() {
        try {
            setLoading(true);
            //TODO Replace with non-user-data endpoint
            const userData = await scoreTableApiV1.get('/healthcheck');
            return userData.data;
        } catch (e) {
            push('/');
            return null;
        }
    }

    async function logout() {
        try {
            await axios.post('/api/auth/logout');
            push('/');
        } catch (e) {
            console.log(e);
        }
    }

    return {
        login,
        logout,
        error,
        loading,
        clearError,
        isAuth,
    };
}
