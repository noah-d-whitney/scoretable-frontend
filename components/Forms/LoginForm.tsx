import { Anchor, Button, Checkbox, Group, PasswordInput, TextInput } from '@mantine/core';

export default function LoginForm() {
  // TODO add form context

  return (
    <>
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth mt="xl">
        Sign in
      </Button>
    </>
  );
}
