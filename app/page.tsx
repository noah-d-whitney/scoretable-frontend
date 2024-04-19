'use client';

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
                    <Text component={Link} href="/" size="xl" fw={700}>ScoreTable</Text>
                </Flex>
                <Flex gap="md">
                    <Button variant="light" component={Link} href='/login'>Login</Button>
                    <Button>Sign up</Button>
                </Flex>
            </Flex>
        </Container>
    );
}
