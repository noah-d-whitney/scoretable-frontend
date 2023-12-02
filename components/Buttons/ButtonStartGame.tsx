'use client';

import { Button, Menu, Group, ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconArrowForward, IconPlus, IconX } from '@tabler/icons-react';
import classes from './ButtonStartGame.module.css';

export default function ButtonStartGame() {
  const theme = useMantineTheme();

  return (
    <Group wrap="nowrap" gap={0}>
      <Button className={classes.button} color="green">
        Start Game
      </Button>
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon variant="filled" color="green" size={36} className={classes.menuControl}>
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconPlus
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.green[5]}
              />
            }
          >
            Add to Queue
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconArrowForward
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.green[5]}
              />
            }
          >
            Up Next
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconX
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.red[5]}
              />
            }
          >
            Cancel Game
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
