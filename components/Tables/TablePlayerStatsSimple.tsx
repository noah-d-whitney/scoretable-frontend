import { Table, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { GamePlayerDTO, TeamGameDetails } from '@/app/api/types';

export default function TablePlayerStatsSimple({ teams }: { teams: TeamGameDetails }) {
  function generateRows(players: GamePlayerDTO[]) {
    const rows = players.map((player) => (
      <Table.Tr key={player.number}>
        <Table.Td lts={1.5} fz="md" ff="mono45-headline" fw={700} c="gray.5">
          {player.number}
        </Table.Td>
        <Table.Td>
          <Text component={Link} href={`/player/${player.id}`} fw={500}>
            {player.name}
          </Text>
        </Table.Td>
        <Table.Td fw={600} c="gray.6">
          {player.points}
        </Table.Td>
        <Table.Td fw={600} c="gray.6">
          {player.rebounds}
        </Table.Td>
        <Table.Td fw={600} c="gray.6">
          {player.assists}
        </Table.Td>
        <Table.Td fw={600} c="gray.6">
          {player.blocks}
        </Table.Td>
        <Table.Td fw={600} c="gray.6">
          {player.steals}
        </Table.Td>
      </Table.Tr>
    ));

    return rows;
  }

  return (
    <>
      <Title order={3} mb={15}>
        {teams.team1.name}
      </Title>
      <Table.ScrollContainer minWidth={700} mb={30}>
        <Table verticalSpacing="md" layout="fixed" striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={45} />
              <Table.Th w={200}>Player</Table.Th>
              <Table.Th>Points</Table.Th>
              <Table.Th>Rebounds</Table.Th>
              <Table.Th>Assists</Table.Th>
              <Table.Th>Blocks</Table.Th>
              <Table.Th>Steals</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{generateRows(teams.team1.players)}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Title order={3} mb={15}>
        {teams.team2.name}
      </Title>
      <Table.ScrollContainer minWidth={700}>
        <Table verticalSpacing="md" layout="fixed" striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={45} />
              <Table.Th w={200}>Player</Table.Th>
              <Table.Th>Points</Table.Th>
              <Table.Th>Rebounds</Table.Th>
              <Table.Th>Assists</Table.Th>
              <Table.Th>Blocks</Table.Th>
              <Table.Th>Steals</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{generateRows(teams.team2.players)}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
