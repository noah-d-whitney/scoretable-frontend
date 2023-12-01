import { Menu, Button, Text } from '@mantine/core';

export default function PlayersMenu() {
  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <Button variant="outline" color="orange">
          Players
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Team 1</Menu.Label>
        <Menu.Item
          leftSection={
            <Text size="sm" c="gray">
              23
            </Text>
          }
        >
          Lebron James
        </Menu.Item>
        <Menu.Item
          leftSection={
            <Text size="sm" c="gray">
              8
            </Text>
          }
        >
          Kobe Bryant
        </Menu.Item>
        <Menu.Item
          leftSection={
            <Text size="sm" c="gray">
              12
            </Text>
          }
        >
          Nikola Jokic
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Team 2</Menu.Label>
        <Menu.Item
          leftSection={
            <Text size="sm" c="gray">
              6
            </Text>
          }
        >
          Kevin Durant
        </Menu.Item>
        <Menu.Item
          leftSection={
            <Text size="sm" c="gray">
              14
            </Text>
          }
        >
          Steph Curry
        </Menu.Item>
        <Menu.Item
          leftSection={
            <Text size="sm" c="gray">
              54
            </Text>
          }
        >
          Anthony Edwards
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
