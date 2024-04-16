'use client';

import { LoginCard } from '@/components/Auth/LoginCard';
import { Button, Container, Flex, Text } from '@mantine/core';
import Link from 'next/link';

export default function App() {
    return (
        <Container size="lg" h={75}>
            <Flex
                py="md"
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap="md" >
                    <Text component={Link} href="/" size='lg' fw={700} c="dimmed">Home</Text>
                    <Text component={Link} href="/" size='lg' fw={700} c="dimmed">About</Text>
                </Flex>
                <Flex gap="md">
                    <Button variant="light">Login</Button>
                    <Button>Sign up</Button>
                </Flex>
            </Flex>
        </Container>
    );
}
