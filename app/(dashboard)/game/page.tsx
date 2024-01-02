'use client';

import { ActionIcon, Card, Table, Title } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import CounterCircles from '@/components/Counters/CounterCircles';

function GameTableRow() {
    return <Table.Tr>
        <Table.Td>5KX6R</Table.Td>
        <Table.Td>05/23/2023</Table.Td>
        <Table.Td>Teams</Table.Td>
        <Table.Td>2v2</Table.Td>
        <Table.Td width={100} pr={20}><CounterCircles
          radius={15}
          count={2}
          max={4}
          color="orange"
        />
        </Table.Td>
        <Table.Td>
            <ActionIcon variant="default">
                <IconPencil size={15} />
            </ActionIcon>
        </Table.Td>
           </Table.Tr>;
}

const ths = (
    <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>Date/Time</Table.Th>
        <Table.Th>Teams</Table.Th>
        <Table.Th>Format</Table.Th>
        <Table.Th>Periods</Table.Th>
        <Table.Th>Actions</Table.Th>
    </Table.Tr>
);

export default function GamesView() {
    return <>
        <Title order={1} mb="lg">Games</Title>
        <Card shadow="md" withBorder radius="md">
            <Table verticalSpacing="md">
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>
                    <GameTableRow />
                    <GameTableRow />
                    <GameTableRow />
                    <GameTableRow />
                    <GameTableRow />
                </Table.Tbody>
            </Table>
        </Card>
           </>;
}
