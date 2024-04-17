'use client';

import {
    ActionIcon,
    Button,
    Card,
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
import React, { ReactElement, useEffect, useState } from 'react';
import {
    IconEye,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconSearch,
    IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import useTeams, { teamDto } from '@/hooks/useTeams';
import { metadata } from '@/hooks/usePlayers';

export default function TeamPage() {
    const [teams, setTeams] = useState<teamDto[]>([]);

    const [mdata, setMdata] = useState<metadata>({
        current_page: 1,
        last_page: 1,
        first_page: 1,
        page_size: 1,
        total_records: 1,
    });
    const [nameQuery, setNameQuery] = useState('');
    const [querying, setQuerying] = useState(false);
    const { getTeams, loading, error } = useTeams();

    // Load teams on mount
    useEffect(() => {
        getTeams({})
            .then(res => {
                setTeams(res.teams);
                setMdata(res.metadata);
            });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            getTeams({ name: nameQuery })
                .then(res => {
                    setTeams(res.teams);
                    setMdata(res.metadata);
                });
            setQuerying(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [nameQuery])

    /* async function deleteTeam(id: string) {
        try {
            notifications.show({
                id: `deleting-team-${id}`,
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
                id: `deleting-team-${id}`,
                message: 'Team Successfully Deleted',
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
                id: `deleting-team-${id}`,
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
    } */

    const teamTableHeaders = (
        <Table.Tr h={40}>
            <Table.Th>Name</Table.Th>
            <Table.Th>Actions</Table.Th>
        </Table.Tr>
    );


    const teamTableRows = teams.map(t => (
        <Table.Tr key={t.pin}>
            <Table.Td width="100%">
                <Link
                    href={`/team/${t.pin}`}
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
                        // onClick={() => deleteTeam(t.pin)}
                        variant="light"
                        color="red"
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    function renderTable(): ReactElement {
        if (loading) {
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
                    <Text>Error getting teams</Text>
                    <Text>{err}</Text>
                    <Button
                        variant="default"
                        // onClick={fetchTeams}
                        leftSection={<IconRefresh size={14} />}
                    >Try Again
                    </Button>
                </Flex>
            );
        }

        if (teams.length === 0) {
            return (
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
        }

        return (
            <Table>
                <TableThead pt="lg">
                    {teamTableHeaders}
                </TableThead>
                <Table.Tbody>
                    {teamTableRows}
                </Table.Tbody>
            </Table>
        );
    }

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
                <TextInput
                    size="sm"
                    radius="md"
                    placeholder="Player Name"
                    leftSection={<IconSearch size={12} />}
                    rightSection={querying ? <Loader size={18} /> : null}
                    w={250}
                    onChange={(e) => {
                        setNameQuery(e.target.value);
                        setQuerying(true);
                    }}
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
                hidden={loading || teams.length === 0}
                total={mdata.last_page}
                value={mdata.current_page}
                onChange={(v) => {
                    if (v === mdata.current_page) return;
                    getTeams({
                        page: v,
                    })
                        .then(res => {
                            setTeams(res.teams);
                            setMdata(res.metadata);
                        });
                }}
                color="orange"
                size="sm"
                radius="md"
            />
        </Flex>
    </>;
}
