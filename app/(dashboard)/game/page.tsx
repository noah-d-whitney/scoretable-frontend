'use client';

import {
    ActionIcon,
    Badge,
    Button,
    Card,
    CloseButton,
    ComboboxClearButton,
    Flex,
    Loader,
    Pagination,
    Select,
    Table,
    TableThead,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import {
    IconCalendar,
    IconEye,
    IconPlus,
    IconRefresh,
    IconSearch,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
import Link from 'next/link';
import useGames, { gameDto, gamesMetadata } from '@/hooks/useGames';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { after } from 'node:test';

export default function TeamPage() {
    function setGamesAndMetadata(res: {
        games: gameDto[],
        metadata: gamesMetadata,
    }) {
        setGames(res.games);
        setMetadata(res.metadata);
    }

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
    });

    //TODO: make function that is called for all filter changes passing in params that are needed to satisfy filters
    function toSimpleDateString(d: DateValue): string | null {
        if (!d) return null;
        const dateString = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
        return dateString;
    }

    const [afterDate, setAfterDate] = useState<DateValue>(null);
    const [beforeDate, setBeforeDate] = useState<DateValue>(null);

    useEffect(() => {
        getAllGames({})
            .then(res => {
                setGames(res.games);
                setMetadata(res.metadata);
            });
    }, []);

    useEffect(() => {
        getAllGames({
            afterDate: afterDate ? `${toSimpleDateString(afterDate)}` : null,
            beforeDate: beforeDate ? `${toSimpleDateString(beforeDate)}` : null,
        }).then(res => setGamesAndMetadata(res));
    }, [afterDate, beforeDate])


    // TODO: load games on mount
    // load games on query changes
    // filters: date-range, status, players, teams, type, team-size
    // render table with updated fields

    const gameTableRows = games.map(g => (
        <Table.Tr key={g.pin_id}>
            <Table.Td>
                <Badge variant='light' size='md'>
                    {g.pin_id}
                </Badge>
            </Table.Td>
            <Table.Td>
                {/* create date format helper*/}
                {new Date(g.date_time).toDateString()}
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

    function renderTable(): ReactElement {
        if (fetching) {
            return (
                <Flex
                    justify="center"
                    my="lg"
                    align="center"
                    h={300}
                >
                    <Loader size="lg" color="orange" />
                </Flex>
            );
        }

        //TODO: implement retry fetch
        if (error !== '') {
            return (
                <Flex direction="column" gap="md" align="center" my="lg">
                    <Text>Error getting games</Text>
                    <Text>{error}</Text>
                    <Button
                        variant="default"
                        leftSection={<IconRefresh size={14} />}
                    >Try Again
                    </Button>
                </Flex>
            );
        }

        if (games.length === 0) {
            return (
                <Flex direction="column" gap="md" align="center" my="lg">
                    <Text>No games found for search!</Text>
                </Flex>
            );
        }

        if (games.length === 0) {
            return (
                <Flex direction="column" gap="md" align="center" my="lg">
                    <Text>You havent created any games yet</Text>
                    <Button
                        variant="default"
                        component={Link}
                        href="/game/create"
                        leftSection={<IconPlus size={14} />}
                    >Create Game
                    </Button>
                </Flex>
            );
        }

        return (
            <Table horizontalSpacing="md" verticalSpacing="md">
                <TableThead pt="lg">
                    {gameTableHeaders}
                </TableThead>
                <Table.Tbody>
                    {gameTableRows}
                </Table.Tbody>
            </Table>
        );
    }

    return <>
        <Title order={1} my="lg">Games</Title>
        <Flex gap="sm" justify="space-between" mb="sm">
            <Button
                variant="light"
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
                {/* TODO: handle errors for fields */}
                <DatePickerInput
                    w={"25%"}
                    value={afterDate}
                    onChange={(e) => setAfterDate(e)}
                    label="After"
                    placeholder="Pick Date"
                    leftSection={
                        <IconCalendar size={16} opacity={0.5} />
                    }
                    rightSection={afterDate ?
                        <ComboboxClearButton
                            onClear={() => setAfterDate(null)}
                        />
                        : null
                    }
                />
                <DatePickerInput
                    w={"25%"}
                    value={beforeDate}
                    onChange={(e) => setBeforeDate(e)}
                    label="Before"
                    placeholder="Pick Date"
                    leftSection={
                        <IconCalendar size={16} opacity={0.5} />
                    }
                    rightSection={afterDate ?
                        <ComboboxClearButton
                            onClear={() => setBeforeDate(null)}
                        />
                        : null
                    }
                />
            </Flex>
            {renderTable()}
        </Card>
        <Flex
            mt="md"
            justify="center"
            align="center"
            direction="row"
        >
            <Pagination
                hidden={fetching || games.length === 0}
                total={metadata.pag.last_page}
                value={metadata.pag.current_page}
                onChange={(v) => {
                    if (v === metadata.pag.current_page) return;
                    getAllGames({
                        page: v,
                    })
                        .then(res => {
                            setGames(res.games);
                            setMetadata(res.metadata);
                        });
                }}
                color="orange"
                size="sm"
                radius="md"
            />
        </Flex>
    </>;
}
