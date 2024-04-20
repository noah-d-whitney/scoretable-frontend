'use client';

import {
    ActionIcon,
    Button,
    Card,
    Flex,
    Loader,
    Select,
    Table,
    TableThead,
    Text,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
    IconEye,
    IconPlus,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import useGames, { gameDto, gamesMetadata } from '@/hooks/useGames';

export default function TeamPage() {
    const { getAllGames, fetching, error } = useGames();

    const [games, setGames] = useState<gameDto[]>([]);
    const [metadata, setMetadata] = useState<gamesMetadata>({
        pag: {
            current_page: 1,
            last_page: 1,
            first_page: 1,
            page_size: 1,
            total_records: 1,
        },
        date_range: null,
        type: null,
        status: null,
        team_pins: null,
        team_size: null,
        player_pins: null,
        includes: null,
    })

    useEffect(() => {
        getAllGames({})
            .then(res => {
                setGames(res.games);
                setMetadata(res.metadata);
            })
    }, []);

    // TODO: load games on mount
    // load games on query changes
    // filters: date-range, status, players, teams, type, team-size
    // render table with updated fields

    const gameRows = games.map(g => (
        <Table.Tr key={g.pin_id}>
            <Table.Td>
                {g.pin_id}
            </Table.Td>
            <Table.Td>
                DATE
            </Table.Td>
            <Table.Td>
                {g.type}
            </Table.Td>
            <Table.Td>
                {g.period_count}
            </Table.Td>
            <Table.Td>
                {g.period_length}
            </Table.Td>
            <Table.Td>
                <Flex gap={10}>
                    <ActionIcon variant="default">
                        <IconEye size={14} />
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        color="red"
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    //TODO add to component
    const noGames = (
        <Flex direction="column" gap="md" align="center" my="lg">
            <Text>You havent created any games yet</Text>
            <Button
                variant="default"
                component={Link}
                href="/create"
                leftSection={<IconPlus size={14} />}
            >Create Game
            </Button>
        </Flex>
    );

    const gameTableHeaders = (
        <Table.Tr h={40}>
            <Table.Th>Id</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Format</Table.Th>
            <Table.Th>Periods</Table.Th>
            <Table.Th>Period Length</Table.Th>
            <Table.Th>Actions</Table.Th>
        </Table.Tr>
    );

    const tableBody = error
        ? (
            <Flex direction="column" gap="md" align="center" my="lg">
                <Text>Error getting games</Text>
                <Text>{error}</Text>
                <Button
                    variant="default"
                    leftSection={<IconRefresh size={14} />}
                >Try Again
                </Button>
            </Flex>)
        : gameRows;

    return <>
        <Title order={1} my="lg">Games</Title>
        <Flex gap="sm" justify="space-between" mb="sm">
            <Button
                variant="filled"
                radius="md"
                color="orange"
                leftSection={<IconPlus size={14} />}
                component={Link}
                href="/game/create"
            >Create Game
            </Button>
        </Flex>
        <Card
            withBorder
            shadow="md"
            radius="md"
            px="md"
            mih={300}
        >
            <Flex gap="sm" mb="md">
                <Select />
            </Flex>
            {fetching
                ? <Flex
                    justify="center"
                    my="lg"
                    align="center"
                    h={300}
                >
                    <Loader size="lg" color="orange" />
                </Flex>
                : <Table>
                    <TableThead pt="lg">
                        {gameTableHeaders}
                    </TableThead>
                    <Table.Tbody>
                        {tableBody}
                    </Table.Tbody>
                </Table>
            }
        </Card>
    </>;
}
