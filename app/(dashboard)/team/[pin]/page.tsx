'use client';

import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Flex,
    LoadingOverlay,
    Table,
    Text,
    Title,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { IconCaretUpDown, IconCheck, IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import useTeams, { teamDto } from '@/hooks/useTeams';
import MultiSelectWidget from '@/app/(dashboard)/team/[pin]/MultiSelectWidget';
import { playerDto } from '@/hooks/usePlayers';

export default function TeamDetailView({ params }: { params: { pin: string } }) {
    const { pin } = params;
    const {
        getTeam,
        assignPlayers,
        loading,
        error,
    } = useTeams();
    const {
        assignLineup,
        error: assignLineupError,
        updating: assignLineupUpdating,
    } = useTeams();
    const [team, setTeam] = useState<teamDto | null>(null);
    const [assignPlayer, setAssignPlayer] = useState(false);

    useEffect(() => {
        getTeam(pin)
            .then(t => setTeam(t))
            .catch(e => {
                if (e.response.status === 404) {
                    // TODO make 404 work
                    notFound();
                }
            });
    }, [pin]);

    function handleAddToLineup(t: teamDto, p: playerDto) {
        const lineup: string[] = [];
        t.players.forEach(pl => {
            if (pl.lineup_pos) lineup.push(pl.pin);
        });
        lineup.push(p.pin);

        notifications.show({
            id: 'add-player-to-lineup',
            title: 'Adding Player to Lineup',
            loading: true,
            message: `${p.first_name} ${p.last_name} is being added to ${t.name}`,
            withBorder: true,
            radius: 'md',
            color: 'orange',
        });

        assignLineup(t.pin, lineup)
            .then(res => {
                setTeam(res);
                notifications.update({
                    id: 'add-player-to-lineup',
                    title: 'Player Added to Lineup',
                    loading: false,
                    message: `${p.first_name} ${p.last_name} successfully added to ${t.name}`,
                    withBorder: true,
                    radius: 'md',
                    color: 'green',
                    icon: <IconCheck />,
                    autoClose: 4000,
                });
            })
            .catch(() => {
                notifications.update({
                    id: 'add-player-to-lineup',
                    title: 'Something Went Wrong',
                    loading: false,
                    message: `Could not add ${p.first_name} ${p.last_name} to ${t.name}: ${assignLineupError}`,
                    withBorder: true,
                    radius: 'md',
                    color: 'red',
                    icon: <IconCheck />,
                    autoClose: 4000,
                });
            });
    }

    function generatePlayerCard(t: teamDto): ReactElement {
        if (t.players.length > 0) {
            return <Flex
              direction="column"
              gap="xs"
              my="xl"
            >
                <Title order={3} fw="normal">Players</Title>
                <Button.Group>
                    <Button
                      variant="default"
                      size="sm"
                      leftSection={<IconPlus size={14} />}
                      onClick={() => setAssignPlayer(true)}
                      loading={assignPlayer}
                    >Assign Player
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      leftSection={<IconCaretUpDown size={14} />}
                    >Reorder Lineup
                    </Button>
                </Button.Group>
                <MultiSelectWidget
                  callbackFn={(pins) => {
                        assignPlayers(t.pin, pins)
                            .then(r => setTeam(r))
                            .catch(() => console.log(error));
                    }}
                  cancelFn={() => setAssignPlayer(false)}
                  show={assignPlayer}
                  loading={loading}
                />
                <Card
                  withBorder
                  shadow="md"
                  radius="md"
                  px="lg"
                  py="xs"
                >
                    <LoadingOverlay
                      visible={assignLineupUpdating}
                      zIndex={1000}
                      overlayProps={{
                            radius: 'sm',
                            blur: 2,
                        }}
                    />
                    <Table
                      verticalSpacing="sm"
                    >
                        <Table.Tbody>
                            {t.players.map(p =>
                                <Table.Tr>
                                    <Table.Td width={30}>
                                        {p.lineup_pos ?
                                            <Text
                                              size="lg"
                                              fw={700}
                                            >{p.lineup_pos}
                                            </Text> :
                                            <ActionIcon
                                              variant="light"
                                              size="sm"
                                              radius="xl"
                                              mt={7}
                                              ml={-5}
                                              onClick={() => handleAddToLineup(t, p)}
                                            ><IconPlus size={14} />
                                            </ActionIcon>}
                                    </Table.Td>
                                    <Table.Td
                                      width={50}
                                      opacity={p.lineup_pos ? 1 : 0.5}
                                    >
                                        <Avatar
                                          size="md"
                                        >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                                        </Avatar>
                                    </Table.Td>
                                    <Table.Td
                                      width={45}
                                      opacity={p.lineup_pos ? 1 : 0.5}
                                    >
                                        <Badge
                                          variant="light"
                                          color="orange"
                                        >
                                            {p.number}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td opacity={p.lineup_pos ? 1 : 0.5}>
                                        <Text size="md">
                                            {`${p.first_name} ${p.last_name}`}
                                        </Text>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </Card>
                   </Flex>;
        }

        return <Card>
            No Players
               </Card>;
    }

    function render(): ReactElement {
        if (team) {
            return (<>
                <Flex
                  justify="space-between"
                  align="center"
                >
                    <Title order={1}>{team.name}</Title>
                    <Badge
                      size="xl"
                      variant="light"
                      radius="md"
                    >{team.pin.toUpperCase()}
                    </Badge>
                </Flex>
                <Flex
                  gap="sm"
                  my="md"
                >
                    <Badge
                      size="lg"
                      color={team.is_active ? 'green' : 'red'}
                      variant="dot"
                    >{team.is_active ? 'active' : 'inactive'}
                    </Badge>
                    <Badge
                      size="lg"
                      variant="default"
                      rightSection={team.size}
                    >Size
                    </Badge>
                </Flex>
                {generatePlayerCard(team)}
                    </>);
        }

        return <></>;
    }

    return <LoadingSuspense
      loading={loading}
      loadingText="Team loading, please wait..."
    >
        {render()}
           </LoadingSuspense>;
}
