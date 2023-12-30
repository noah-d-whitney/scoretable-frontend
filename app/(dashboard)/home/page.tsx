'use client';

import {
    Accordion,
    Autocomplete,
    Button,
    Card,
    Flex,
    Grid,
    Menu,
    MultiSelect,
    Text,
    rem, Title, Tabs,
} from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconCaretDownFilled,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import GameAccordionCard from './GameAccordionCard';
import {gray} from "next/dist/lib/picocolors";

export default function Game() {
  return (
    <>
        <Title order={1} my={10}>Home</Title>
        <Tabs color="orange" variant="pills" radius="md" defaultValue="gallery">
            <Tabs.List w="fit-content" bg="gray.1" p={5} style={{borderRadius: 10}}>
                <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
                    Gallery
                </Tabs.Tab>
                <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
                    Messages
                </Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
                    Settings
                </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="gallery">
                Gallery tab content
            </Tabs.Panel>
            
            <Tabs.Panel value="messages">
                Messages tab content
            </Tabs.Panel>
            
            <Tabs.Panel value="settings">
                Settings tab content
            </Tabs.Panel>
        </Tabs>
    </>
  );
}
