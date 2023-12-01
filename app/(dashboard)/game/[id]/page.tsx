import { ActionIcon, Badge, Button, Container, Flex, Paper, Text } from '@mantine/core';
import { IconEdit, IconPencil, IconTournament } from '@tabler/icons-react';

export default function GameDetailView() {
  return (
    <Container>
      <Paper p={20} h={150} radius="md" withBorder shadow="md" style={{ width: '100%' }}>
        <Flex align="center" gap={25} mb={15}>
          <Badge color="gray.7" leftSection={<IconTournament />} size="md" py={20} px={15}>
            <Text fw={800}>Tourney</Text>
          </Badge>
          <Text size="lg">Waynesboro 3x3 2023</Text>
          <ActionIcon color="orange" variant="light" aria-label="edit game tournament">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
        <Flex align="center" gap={25}>
          <Badge color="gray.7" leftSection={<IconTournament />} size="md" py={20} px={15}>
            <Text fw={800}>League</Text>
          </Badge>
          <Text size="lg">Waynesboro Mens League</Text>
          <ActionIcon color="orange" variant="light" aria-label="edit game tournament">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Paper>
    </Container>
  );
}
