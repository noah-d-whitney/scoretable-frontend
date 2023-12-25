'use client';

import {
    Alert,
    Anchor, Box,
    Button,
    Checkbox,
    Group,
    PasswordInput,
    TextInput,
    Text
} from '@mantine/core';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import useAuth from '@/hooks/useAuth';

export default function LoginForm() {
    const { LoginUser, isLoading, error, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function onSubmit() {
        LoginUser({ email, password }).then(e => console.log(e));
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
      <Button fullWidth mt="xl" onClick={onSubmit} loading={isLoading}>
        Sign in
      </Button>
        {error ? <Alert mt={10} onClose={clearError} withCloseButton variant="filled" color="red" icon={<IconAlertCircle />}>{error}</Alert> : null}
    </>
  );
}
