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
    IconCheck,
    IconEye,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { GameSummaryDTO } from '@/app/api/types';

export default function TeamPage() {
    const [games, setGames] = useState<GameSummaryDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchGames() {
        try {
            setLoading(true);
            const res = await fetch('../api/game', {
                method: 'GET',
            });
            const fetchedGames = await res.json();
            setGames(fetchedGames);
        } catch (e: any) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function deleteGame(id: string) {
        try {
            notifications.show({
                id: `deleting-game-${id}`,
                title: 'Deleting Game',
                message: 'Please wait while your game is deleted. It will' +
                    ' only take a few seconds!',
                color: 'orange',
                loading: true,
                withBorder: true,
                radius: 'md',
            });
            const res = await axios.delete(`api/game?id=${id}`);
            notifications.update({
                id: `deleting-game-${id}`,
                message: 'Game Successfully Deleted',
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconCheck />,
                radius: 'md',
                autoClose: 5000,
            });
            setGames((g) => g.filter(g => g.id !== id));
            console.log(res);
        } catch (e: any) {
            notifications.update({
                id: `deleting-game-${id}`,
                title: 'Error',
                message: e.response.message,
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconCheck />,
                radius: 'md',
                autoClose: 5000,
            });
            console.log(e);
        }
    }

    useEffect(() => {
        fetchGames();
    }, []);

    const gameRows = games.map(g => (
        <Table.Tr key={g.id}>
            <Table.Td>
                {g.id}
            </Table.Td>
            <Table.Td>
                Date
            </Table.Td>
            <Table.Td>
                {g.GameFormat}
            </Table.Td>
            <Table.Td>
                {g.periodCount}
            </Table.Td>
            <Table.Td>
                {g.periodLength}
            </Table.Td>
            <Table.Td>
                <Flex gap={10}>
                    <ActionIcon variant="default">
                        <IconPencil size={14} />
                    </ActionIcon>
                    <ActionIcon variant="default">
                        <IconEye size={14} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => deleteGame(g.id)}
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
                  onClick={fetchGames}
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
            {loading
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
