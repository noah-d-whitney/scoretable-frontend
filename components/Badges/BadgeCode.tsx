'use client';

import { Button, ButtonProps, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';

type BadgeGameStatusProps = {
  code: string;
};

export default function BadgeCode(props: BadgeGameStatusProps & ButtonProps) {
  const { code, ...buttonProps } = props;

  const clipboard = useClipboard();
  return (
    <Tooltip
      label="Code copied!"
      offset={5}
      position="bottom"
      radius="xl"
      transitionProps={{ duration: 100, transition: 'slide-down' }}
      opened={clipboard.copied}
    >
      <Button
        variant="light"
        rightSection={
          clipboard.copied ? (
            <IconCheck size={14} stroke={1.5} />
          ) : (
            <IconCopy size={14} stroke={1.5} />
          )
        }
        size="sm"
        onClick={() => clipboard.copy(code.toUpperCase())}
        {...buttonProps}
      >
        {code.toUpperCase()}
      </Button>
    </Tooltip>
  );
}
