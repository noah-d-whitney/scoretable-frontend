'use client';

/* MANTINE IMPORTS */
import { AppShell, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

/* COMPONENT IMPORTS */
import { createContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AppHeader from '@/components/Layout/AppHeader';
import AppNavbar from '@/components/Layout/AppNavbar';
import useAuth from '@/hooks/useAuth';
import { UserData } from '@/app/api/types';

const AuthContext = createContext<UserData | null>(null);
export default function DashboardLayout({ children }: { children: any }) {
    const [opened, { toggle }] = useDisclosure();
    const [authContextData, setAuthContextData] = useState<UserData | null>(null);
    const { isAuth } = useAuth();
    const path = usePathname();
    useEffect(() => {
        isAuth()
            .then(res => {
                setAuthContextData(res);
            });
    }, [path]);

    return (
        <AuthContext.Provider value={authContextData}>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                    width: 250,
                    breakpoint: 'md',
                    collapsed: { mobile: !opened },
                }}
              padding="md"
            >
                <AppShell.Header
                  px={20}
                  style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <AppHeader opened={opened} toggle={() => toggle()} />
                </AppShell.Header>

                <AppShell.Navbar p="md" bg="orange">
                    <AppNavbar />
                </AppShell.Navbar>

                <AppShell.Main>
                    <Container p="lg">
                        {children}
                    </Container>
                </AppShell.Main>
            </AppShell>
        </AuthContext.Provider>
    );
}
