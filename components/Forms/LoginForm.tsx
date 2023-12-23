'use client';

import { Anchor, Button, Checkbox, Group, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    axios.defaults.withCredentials = true;
    const api = axios.create({
        baseURL: 'https://localhost:7272',
    });
    async function onSubmit() {
        try {
            await api.post('/login?useCookies=true', { email, password });
            router.push('/home');
        } catch (e) {
            console.log(e);
        }
    }
  return (
    <>
      <TextInput label="Email" placeholder="you@mantine.dev" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <PasswordInput label="Password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required mt="md" />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth mt="xl" onClick={onSubmit}>
        Sign in
      </Button>
    </>
  );
}
