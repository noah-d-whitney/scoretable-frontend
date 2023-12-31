'use client';

import { Box, Burger } from '@mantine/core';
import DarkModeSwitch from '../Buttons/DarkModeSwitch';

export default function AppHeader({
                                      opened,
                                      toggle,
                                  }: { opened: boolean; toggle: () => void }) {
    return (
        <>
            <Box>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="md"
                  size="sm"
                />
            </Box>
            <DarkModeSwitch />
        </>
    );
}
