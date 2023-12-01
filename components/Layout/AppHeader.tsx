import { Box, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DarkModeSwitch from '../Buttons/DarkModeSwitch';

export default function AppHeader() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <Box>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Box>
      <DarkModeSwitch />
    </>
  );
}
