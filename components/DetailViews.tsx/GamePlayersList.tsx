import { Box, Button, Flex, Grid, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useHover } from '@mantine/hooks';
import ButtonPlayerGameOptions from '../Buttons/ButtonPlayerGameOptions';
import { GamePlayerDTO, GameTeamsInterface } from '@/app/api/types';

function PlayerCard({ name, number, id }: { name: string; number: number; id: string }) {
  const { colorScheme } = useMantineColorScheme();
  const { ref, hovered } = useHover();
  return (
    <Paper
      py={15}
      px={20}
      style={{ width: '100%' }}
      shadow="xs"
      withBorder
      bg={hovered ? (colorScheme === 'light' ? 'gray.0' : 'dark') : undefined}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={15}>
          <Text c="dimmed">{number}</Text>
          <Box ref={ref}>
            <Text component={Link} href={`/player/${id}`} size="xl" fw={400}>
              {name}
            </Text>
          </Box>
        </Flex>
        <ButtonPlayerGameOptions />
      </Flex>
    </Paper>
  );
}

export default function GamePlayersList(props: GameTeamsInterface) {
  function generateCards(players: GamePlayerDTO[]) {
    const cards = players.map((p) => <PlayerCard id={p.id} name={p.name} number={p.number} />);

    return cards;
  }

  return (
    <Grid gutter={20} mt={25} mb={30}>
      <Grid.Col span={{ base: 12, sm: 6 }} px={10}>
        <Title order={3} mb={15}>
          {props.team1.name}
        </Title>
        <Flex direction="column" gap={10}>
          {generateCards(props.team1.players)}
          <Button color="orange" variant="subtle" rightSection={<IconPlus size={14} />}>
            Add Player
          </Button>
        </Flex>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Title order={3} mb={15}>
          {props.team2.name}
        </Title>
        <Flex direction="column" gap={10}>
          {generateCards(props.team2.players)}
          <Button color="orange" variant="subtle" rightSection={<IconPlus size={14} />}>
            Add Player
          </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
