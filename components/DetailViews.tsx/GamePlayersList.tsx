import { Button, Flex, Grid, Paper, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import ButtonPlayerGameOptions from '../Buttons/ButtonPlayerGameOptions';

function PlayerCard({ player }: { player: { name: string; id: string; number: number } }) {
  return (
    <Paper py={15} px={20} style={{ width: '100%' }} shadow="xs" withBorder>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={15}>
          <Text c="dimmed">{player.number}</Text>
          <Text size="xl" fw={400}>
            {player.name}
          </Text>
        </Flex>
        <ButtonPlayerGameOptions />
      </Flex>
    </Paper>
  );
}

export default function GamePlayersList() {
  return (
    <Grid gutter={20} mt={25} mb={30}>
      <Grid.Col span={{ base: 12, sm: 6 }} px={10}>
        <Title order={3} mb={15}>
          Golden State Warriors
        </Title>
        <Flex direction="column" gap={10}>
          <PlayerCard player={{ name: 'Lebron James', number: 23, id: '5tfk' }} />
          <PlayerCard player={{ name: 'Stephen Curry', number: 23, id: '5tfk' }} />
          <PlayerCard player={{ name: 'Draymond Green', number: 23, id: '5tfk' }} />
          <PlayerCard player={{ name: 'Damian Lillard', number: 23, id: '5tfk' }} />
          <Button color="orange" variant="subtle" rightSection={<IconPlus size={14} />}>
            Add Player
          </Button>
        </Flex>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Title order={3} mb={15}>
          Golden State Warriors
        </Title>
        <Flex direction="column" gap={10}>
          <PlayerCard player={{ name: 'Lebron James', number: 23, id: '5tfk' }} />
          <PlayerCard player={{ name: 'Stephen Curry', number: 23, id: '5tfk' }} />
          <PlayerCard player={{ name: 'Draymond Green', number: 23, id: '5tfk' }} />
          <PlayerCard player={{ name: 'Damian Lillard', number: 23, id: '5tfk' }} />
          <Button color="orange" variant="subtle" rightSection={<IconPlus size={14} />}>
            Add Player
          </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
