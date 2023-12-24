'use client';

import {Box, Burger, Text} from '@mantine/core';
import DarkModeSwitch from '../Buttons/DarkModeSwitch';
import useAuth from "@/hooks/useAuth";

export default function AppHeader({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    const {AuthContextData} = useAuth();
  return (
    <>
      <Box>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Box>
        <Text fw={700}>Hello {AuthContextData?.firstName}</Text>
      <DarkModeSwitch />
    </>
  );
}
