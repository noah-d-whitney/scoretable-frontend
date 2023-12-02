'use client';

import { Button, Menu, Group, ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconX, IconDownload, IconPrinter, IconUpload } from '@tabler/icons-react';
import classes from './ButtonWithMenu.module.css';

export default function ButtonStatsDetail() {
  const theme = useMantineTheme();

  return (
    <Group wrap="nowrap" gap={0}>
      <Button className={classes.button} variant="default">
        View Detailed Stats
      </Button>
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="default" size={36} className={classes.menuControl}>
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconDownload
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.gray[5]}
              />
            }
          >
            Download
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconPrinter
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.gray[5]}
              />
            }
          >
            Print
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconUpload
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.gray[5]}
              />
            }
            disabled
          >
            Upload
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
            Delete Stats
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
