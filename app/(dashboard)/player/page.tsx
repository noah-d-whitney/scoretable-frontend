'use client';

import {
    ActionIcon,
    Avatar,
    Badge,
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
import { PlayerSummaryDto } from '@/app/api/types';

export default function PlayerPage() {
    const [players, setPlayers] = useState<PlayerSummaryDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchPlayers() {
        try {
            setLoading(true);
            const res = await fetch('../api/player', {
                method: 'GET',
            });
            const fetchedPlayers = await res.json();
            console.log(players);
            setPlayers(fetchedPlayers);
        } catch (e: any) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function deletePlayer(id: string) {
        try {
            notifications.show({
                id: 'deleting-player',
                title: 'Deleting Player',
                message: 'Please wait while your player is deleted. It will' +
                    ' only take a few seconds!',
                color: 'orange',
                loading: true,
                withBorder: true,
                radius: 'md',
            });
            const res = await axios.delete(`api/player?id=${id}`);
            notifications.update({
                id: 'deleting-player',
                title: 'Deleted Player',
                message: 'Player successfully deleted, navigating to new' +
                    ' player page',
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconCheck />,
                radius: 'md',
                autoClose: 5000,
            });
            setPlayers((p) => p.filter(p => p.id !== id));
            console.log(res);
        } catch (e: any) {
            notifications.update({
                id: 'deleting-game',
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
        fetchPlayers();
    }, []);

    const playerRows = players.map(p => (
        <Table.Tr key={p.id}>
            <Table.Td width={45}>
                <Badge variant="light" color="orange">
                    {p.number}
                </Badge>
            </Table.Td>
            <Table.Td width={20}>
                <Avatar
                  size="md"
                >{p.firstName.slice(0, 1) + p.lastName.slice(0, 1)}
                </Avatar>
            </Table.Td>
            <Table.Td width="100%">{`${p.firstName} ${p.lastName}`}</Table.Td>
            <Table.Td>
                <Flex gap={10}>
                    <ActionIcon variant="default">
                        <IconPencil size={14} />
                    </ActionIcon>
                    <ActionIcon variant="default">
                        <IconEye size={14} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => deletePlayer(p.id)}
                      variant="light"
                      color="red"
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    const noPlayers = (
        <Flex direction="column" gap="md" align="center" my="lg">
            <Text>You havent created any players yet</Text>
            <Button
              variant="default"
              component={Link}
              href="/create"
              leftSection={<IconPlus size={14} />}
            >Create Player
            </Button>
        </Flex>
    );

    const playerTableHeaders = (
        <Table.Tr h={40}>
            <Table.Th />
            <Table.Th />
            <Table.Th>Name</Table.Th>
            <Table.Th>Actions</Table.Th>
        </Table.Tr>
    );

    const tableBody = error
        ? (
            <Flex direction="column" gap="md" align="center" my="lg">
                <Text>Error getting players</Text>
                <Text>{error}</Text>
                <Button
                  variant="default"
                  onClick={fetchPlayers}
                  leftSection={<IconRefresh size={14} />}
                >Try Again
                </Button>
            </Flex>)
        : playerRows;

    return <>
        <Title order={1} my="lg">Players</Title>
        <Flex gap="sm" justify="space-between" mb="sm">
            <Button
              variant="filled"
              radius="md"
              color="orange"
              leftSection={<IconPlus size={14} />}
              component={Link}
              href="/player/create"
            >Create Player
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
                        {playerTableHeaders}
                    </TableThead>
                    <Table.Tbody>
                        {tableBody}
                    </Table.Tbody>
                  </Table>
            }
        </Card>
           </>;
}
