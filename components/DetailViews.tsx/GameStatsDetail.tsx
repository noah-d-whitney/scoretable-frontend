import { Divider, Flex, Table, Text } from '@mantine/core';
import ButtonStatsDetail from '../Buttons/ButtonStatsDetail';
import { GamePlayerDTO, GameTeamsInterface } from '@/app/api/types';

export default function GameStatsDetail(props: GameTeamsInterface) {
  function generateRows(players: GamePlayerDTO[]) {
    const rows = players.map((player) => (
      <Table.Tr key={player.number}>
        <Table.Td lts={1.5} fz="md" ff="mono45-headline" fw={700} c="gray.5">
          {player.number}
        </Table.Td>
        <Table.Td fw={600}>{player.name}</Table.Td>
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
      <Flex>
        <ButtonStatsDetail />
      </Flex>
      <Divider mt={10} mb={25} />
      <Text size="xl" tt="uppercase" fw={700} mb={15}>
        {props.team1.name}
      </Text>
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
          <Table.Tbody>{generateRows(props.team1.players)}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Text size="xl" tt="uppercase" fw={700} mb={15}>
        {props.team2.name}
      </Text>
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
          <Table.Tbody>{generateRows(props.team2.players)}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
