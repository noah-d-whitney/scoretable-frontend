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
    Table,
    TableTfoot,
    TableThead,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
    IconEye,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconSearch,
    IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import usePlayers, { metadata, playerDto } from '@/hooks/usePlayers';

export default function PlayerPage() {
    const [playerNameQuery, setPlayerNameQuery] = useState('');
    const [querying, setQuerying] = useState(false);
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
        deletePlayer,
        error,
        loading,
    } = usePlayers();

    useEffect(() => {
        // setPlayers([]);
        const timeout = setTimeout(() => {
            getPlayers({ name: playerNameQuery })
                .then(res => {
                    setPlayers(res.players);
                    setMdata(res.metadata);
                });
            setQuerying(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [playerNameQuery]);

    useEffect(() => {
        getPlayers({})
            .then(res => {
                setPlayers(res.players);
                setMdata(res.metadata);
            });
    }, []);

    function handleDelete(pin: string) {
        deletePlayer(pin)
            .then(() => {
                getPlayers({
                    name: playerNameQuery,
                    page: mdata.current_page,
                    pageSize: mdata.page_size,
                })
                    .then((res) => {
                        setPlayers(res.players);
                        setMdata(res.metadata);
                    });
            });
    }

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
                    <ActionIcon
                      onClick={() => handleDelete(p.pin)}
                      variant="light"
                      color="red"
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    const playerTableHeaders = (
        <Table.Tr h={40}>
            <Table.Th />
            <Table.Th />
            <Table.Th>
                Name
            </Table.Th>
            <Table.Th>Actions</Table.Th>
        </Table.Tr>
    );

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
                <TextInput
                  size="sm"
                  radius="md"
                  placeholder="Player Name"
                  leftSection={<IconSearch size={12} />}
                  rightSection={querying ? <Loader size={18} /> : null}
                  w={250}
                  onChange={(e) => {
                        setPlayerNameQuery(e.target.value);
                        setQuerying(true);
                    }}
                />
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
                            {playerRows || null}
                        </Table.Tbody>
                        <TableTfoot />
                    </Table>
                  </>
            }
            {error !== '' ?
                <Flex
                  hidden
                  direction="column"
                  gap="md"
                  align="center"
                  my="lg"
                >
                    <Text>Error getting players</Text>
                    <Button
                      variant="default"
                        // onClick={fetchPlayers}
                      leftSection={<IconRefresh size={14} />}
                    >Try Again
                    </Button>
                </Flex> : null}
            {players.length === 0 && !loading ?
                <Flex
                  hidden={players.length > 0}
                  direction="column"
                  gap="md"
                  align="center"
                  my="lg"
                >
                    <Text>
                        No players found
                    </Text>
                    <Button
                      variant="default"
                      component={Link}
                      href="/create"
                      leftSection={<IconPlus size={14} />}
                    >Create Player
                    </Button>
                </Flex> : null}
        </Card>
        <Flex
          mt="md"
          justify="center"
          align="center"
          direction="row"
        >
            <Pagination
              hidden={loading || players.length === 0}
              total={mdata.last_page}
              value={mdata.current_page}
              onChange={(v) => {
                    if (v === mdata.current_page) return;
                    getPlayers({
                        page: v,
                    })
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
