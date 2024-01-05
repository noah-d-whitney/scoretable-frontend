'use client';

import {
    ActionIcon,
    Avatar,
    Button,
    Card,
    Flex,
    Loader,
    Table,
    Text,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
    IconEye,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import { PlayerSummaryDto } from '@/app/api/types';

export default function TeamPage() {
    const [players, setPlayers] = useState<PlayerSummaryDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchPlayers() {
        try {
            setLoading(true);
            const res = await fetch('../api/player', {
                method: 'GET',
            });
            const players = await res.json();
            console.log(players);
            setPlayers(players);
        } catch (e: any) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchPlayers();
    }, []);

    const playerRows = players.length > 0
        ? players.map(p => (
            <Table.Tr key={p.id}>
                <Table.Td>{p.number}</Table.Td>
                <Table.Td>
                    <Avatar
                      size="md"
                    >{p.firstName.slice(0, 1) + p.lastName.slice(0, 1)}
                    </Avatar>
                </Table.Td>
                <Table.Td>{`${p.firstName} ${p.lastName}`}</Table.Td>
                <Table.Td>
                    <Flex gap={10}>
                        <ActionIcon variant="default">
                            <IconPencil size={14} />
                        </ActionIcon>
                        <ActionIcon variant="default">
                            <IconEye size={14} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="red">
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Flex>
                </Table.Td>
            </Table.Tr>
        ))
        : <Flex direction="column" gap="md" align="center" my="lg">
            <Text>You havent created any players yet</Text>
            <Button
              variant="default"
              component={Link}
              href="/create"
              leftSection={<IconPlus size={14} />}
            >Create Player
            </Button>
          </Flex>;

    const playerTableHeaders = (
        <Table.Tr>
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
        <Title order={3}>Players</Title>
        <Card withBorder shadow="md">
            <Table>
                <Table.Thead>
                    {playerTableHeaders}
                </Table.Thead>
                <Table.Tbody>
                    {loading ? <Loader size="lg" my="lg" /> : tableBody}
                </Table.Tbody>
            </Table>
        </Card>
           </>;
}
