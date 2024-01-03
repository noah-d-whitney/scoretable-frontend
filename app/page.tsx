'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { LoginCard } from '@/components/Auth/LoginCard';
import { queryClient } from '@/app/api/queryClient';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginCard />;
        </QueryClientProvider>
    );
}
