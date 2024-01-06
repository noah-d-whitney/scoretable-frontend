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
import { TeamSummaryDTO } from '@/app/api/types';

export default function TeamPage() {
    const [teams, setTeams] = useState<TeamSummaryDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchTeams() {
        try {
            setLoading(true);
            const res = await fetch('../api/team', {
                method: 'GET',
            });
            const fetchedTeams = await res.json();
            setTeams(fetchedTeams);
        } catch (e: any) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function deleteTeam(id: string) {
        try {
            notifications.show({
                id: 'deleting-team',
                title: 'Deleting Team',
                message: 'Please wait while your team is deleted. It will' +
                    ' only take a few seconds!',
                color: 'orange',
                loading: true,
                withBorder: true,
                radius: 'md',
            });
            const res = await axios.delete(`api/team?id=${id}`);
            notifications.update({
                id: 'deleting-team',
                title: 'Deleted Team',
                message: 'Team successfully deleted, navigating to new' +
                    ' player page',
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconCheck />,
                radius: 'md',
                autoClose: 5000,
            });
            setTeams((t) => t.filter(t => t.id !== id));
            console.log(res);
        } catch (e: any) {
            notifications.update({
                id: 'deleting-team',
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
        fetchTeams();
    }, []);

    const teamRows = teams.map(t => (
        <Table.Tr key={t.id}>
            <Table.Td width="100%">
                <Link
                  href={`/team/${t.id}`}
                  style={{
                        color: 'inherit',
                        textDecoration: 'inherit',
                    }}
                >
                    {t.name}
                </Link>
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
                      onClick={() => deleteTeam(t.id)}
                      variant="light"
                      color="red"
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    const noTeams = (
        <Flex direction="column" gap="md" align="center" my="lg">
            <Text>You havent created any teams yet</Text>
            <Button
              variant="default"
              component={Link}
              href="/create"
              leftSection={<IconPlus size={14} />}
            >Create Team
            </Button>
        </Flex>
    );

    const teamTableHeaders = (
        <Table.Tr h={40}>
            <Table.Th>Name</Table.Th>
            <Table.Th>Actions</Table.Th>
        </Table.Tr>
    );

    const tableBody = error
        ? (
            <Flex direction="column" gap="md" align="center" my="lg">
                <Text>Error getting teams</Text>
                <Text>{error}</Text>
                <Button
                  variant="default"
                  onClick={fetchTeams}
                  leftSection={<IconRefresh size={14} />}
                >Try Again
                </Button>
            </Flex>)
        : teamRows;

    return <>
        <Title order={1} my="lg">Teams</Title>
        <Flex gap="sm" justify="space-between" mb="sm">
            <Button
              variant="filled"
              radius="md"
              color="orange"
              leftSection={<IconPlus size={14} />}
              component={Link}
              href="/team/create"
            >Create Team
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
                        {teamTableHeaders}
                    </TableThead>
                    <Table.Tbody>
                        {tableBody}
                    </Table.Tbody>
                  </Table>
            }
        </Card>
           </>;
}
