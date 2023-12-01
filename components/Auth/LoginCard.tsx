import { Anchor, Paper, Title, Text, Box } from '@mantine/core';

import LoginForm from '../Forms/LoginForm';

export function LoginCard() {
  return (
    <div
      style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box maw={450} mx={10} style={{ width: '100%' }}>
        <Title ta="center" fw={900}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <LoginForm />
        </Paper>
      </Box>
    </div>
  );
}
