import { Divider, Flex, Table, Text } from '@mantine/core';
import ButtonStatsDetail from '../Buttons/ButtonStatsDetail';

export default function GameStatsDetail() {
  const elements = [
    {
      number: 23,
      player: 'Danny Green',
      points: 12,
      rebounds: 2,
      assists: 4,
      blocks: 3,
      steals: 1,
    },
    {
      number: 4,
      player: 'Steph Curry',
      points: 14,
      rebounds: 4,
      assists: 8,
      blocks: 3,
      steals: 1,
    },
    {
      number: 69,
      player: 'Lebron James',
      points: 27,
      rebounds: 11,
      assists: 6,
      blocks: 3,
      steals: 1,
    },
    {
      number: 22,
      player: 'Kevin Durant',
      points: 19,
      rebounds: 8,
      assists: 4,
      blocks: 3,
      steals: 1,
    },
    {
      number: 12,
      player: 'James Harden',
      points: 5,
      rebounds: 5,
      assists: 5,
      blocks: 3,
      steals: 1,
    },
  ];
  const rows = elements.map((element) => (
    <Table.Tr key={element.number}>
      <Table.Td lts={1.5} fz="md" ff="mono45-headline" fw={700} c="gray.5">
        {element.number}
      </Table.Td>
      <Table.Td fw={600}>{element.player}</Table.Td>
      <Table.Td fw={600} c="gray.6">
        {element.points}
      </Table.Td>
      <Table.Td fw={600} c="gray.6">
        {element.rebounds}
      </Table.Td>
      <Table.Td fw={600} c="gray.6">
        {element.assists}
      </Table.Td>
      <Table.Td fw={600} c="gray.6">
        {element.blocks}
      </Table.Td>
      <Table.Td fw={600} c="gray.6">
        {element.steals}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex>
        <ButtonStatsDetail />
      </Flex>
      <Divider mt={10} mb={25} />
      <Text size="xl" tt="uppercase" fw={700} mb={15}>
        Los Angeles Lakers
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Text size="xl" tt="uppercase" fw={700} mb={15}>
        Golden State Warriors
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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
