'use client';

import { Menu, ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { IconX, IconReplace, IconEye, IconSettings } from '@tabler/icons-react';

export default function ButtonPlayerGameOptions() {
  const theme = useMantineTheme();

  return (
    <Menu transitionProps={{ transition: 'pop' }} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg" color="orange">
          <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconEye
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
              color={theme.colors.gray[5]}
            />
          }
        >
          View Player
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconReplace
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
              color={theme.colors.gray[5]}
            />
          }
        >
          Replace Player
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconX
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
              color={theme.colors.red[5]}
            />
          }
          c="red.5"
        >
          Remove from Game
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
