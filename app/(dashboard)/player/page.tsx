'use client';

import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Flex,
    Loader,
    Pagination,
    Select,
    Table,
    TableTfoot,
    TableThead,
    Text,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconEye, IconPencil, IconPlus, IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';
import usePlayers, { metadata, playerDto } from '@/hooks/usePlayers';

export default function PlayerPage() {
    const [players, setPlayers] = useState<playerDto[]>([]);
    const [mdata, setMdata] = useState<metadata>({
        current_page: 1,
        last_page: 1,
        first_page: 1,
        page_size: 1,
        total_records: 1,
    });
    const {
        getPlayers,
        error,
        loading,
    } = usePlayers();

    // async function deletePlayer(id: string) {
    //     try {
    //         notifications.show({
    //             id: 'deleting-player',
    //             title: 'Deleting Player',
    //             message: 'Please wait while your player is deleted. It will' +
    //                 ' only take a few seconds!',
    //             color: 'orange',
    //             loading: true,
    //             withBorder: true,
    //             radius: 'md',
    //         });
    //         const res = await axios.delete(`api/player?id=${id}`);
    //         notifications.update({
    //             id: 'deleting-player',
    //             title: 'Deleted Player',
    //             message: 'Player successfully deleted, navigating to new' +
    //                 ' player page',
    //             color: 'green',
    //             loading: false,
    //             withBorder: true,
    //             icon: <IconCheck />,
    //             radius: 'md',
    //             autoClose: 5000,
    //         });
    //         setPlayers((p) => p.filter(p => p.id !== id));
    //         console.log(res);
    //     } catch (e: any) {
    //         notifications.update({
    //             id: 'deleting-game',
    //             title: 'Error',
    //             message: e.response.message,
    //             color: 'green',
    //             loading: false,
    //             withBorder: true,
    //             icon: <IconCheck />,
    //             radius: 'md',
    //             autoClose: 5000,
    //         });
    //         console.log(e);
    //     }
    // }

    useEffect(() => {
        getPlayers({})
            .then(res => {
                setPlayers(res.players);
                setMdata(res.metadata);
            });
    }, []);

    const playerRows = players.map(p => (
        <Table.Tr key={p.pin}>
            <Table.Td width={45}>
                <Badge variant="light" color="orange">
                    {p.pref_number}
                </Badge>
            </Table.Td>
            <Table.Td width={20}>
                <Avatar
                  size="md"
                >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                </Avatar>
            </Table.Td>
            <Table.Td width="100%">
                <Link
                  href={`/player/${p.pin}`}
                  style={{
                        color: 'inherit',
                        textDecoration: 'inherit',
                    }}
                >
                    {`${p.first_name} ${p.last_name}`}
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
                    {/*<ActionIcon*/}
                    {/*  onClick={() => deletePlayer(p.pin)}*/}
                    {/*  variant="light"*/}
                    {/*  color="red"*/}
                    {/*>*/}
                    {/*    <IconTrash size={14} />*/}
                    {/*</ActionIcon>*/}
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
                <Button
                  variant="default"
                    // onClick={fetchPlayers}
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
                    h={250}
                >
                    <Loader size="lg" color="orange" />
                  </Flex>
                : <>
                    <Table>
                        <TableThead pt="lg">
                            {playerTableHeaders}
                        </TableThead>
                        <Table.Tbody>
                            {tableBody}
                        </Table.Tbody>
                        <TableTfoot />
                    </Table>
                  </>
            }
        </Card>
        <Flex
          mt="md"
          justify="center"
          align="center"
          direction="row"
        >
            <Pagination
              hidden={loading}
              total={mdata.last_page}
              value={mdata.current_page}
              onChange={(v) => {
                    if (v === mdata.current_page) return;
                    getPlayers({ page: v })
                        .then(res => {
                            setPlayers(res.players);
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
