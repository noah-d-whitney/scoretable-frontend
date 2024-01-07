'use client';

import { Burger, Flex } from '@mantine/core';
import DarkModeSwitch from '../Buttons/DarkModeSwitch';

export default function AppHeader({
                                      opened,
                                      toggle,
                                  }: { opened: boolean; toggle: () => void }) {
    return (
        <>
            <Flex align="center" gap="sm">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="md"
                  size="sm"
                />
                {/*<ActionIcon*/}
                {/*  variant="default"*/}
                {/*  size="xl"*/}
                {/*>*/}
                {/*    <IconArrowLeft stroke={1.5} />*/}
                {/*</ActionIcon>*/}
            </Flex>
            <DarkModeSwitch />
        </>
    );
}
