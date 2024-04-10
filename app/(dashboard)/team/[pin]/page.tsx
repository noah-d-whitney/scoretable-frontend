'use client';

import {
    Avatar,
    Badge,
    Button,
    Card,
    Flex,
    Table,
    Text,
    Title,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { IconCaretUpDown, IconPlus } from '@tabler/icons-react';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import useTeams, { teamDto } from '@/hooks/useTeams';
import MultiSelectWidget from '@/app/(dashboard)/team/[pin]/MultiSelectWidget';

export default function TeamDetailView({ params }: { params: { pin: string } }) {
    const { pin } = params;
    const {
        getTeam,
        loading,
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
                        pins.forEach(p => console.log(`${p}\n`));
                        setAssignPlayer(false);
                    }}
                  cancelFn={() => setAssignPlayer(false)}
                  show={assignPlayer}
                  loading={false}
                />
                <Card
                  withBorder
                  shadow="md"
                  radius="md"
                  px="md"
                >
                    <Table
                      verticalSpacing="md"
                    >
                        <Table.Tbody>
                            {t.players.map(p =>
                                <Table.Tr>
                                    <Table.Td width={30}>
                                        <Text
                                          size="lg"
                                          fw={700}
                                        >{p.lineup_pos}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td width={50}>
                                        <Avatar
                                          size="md"
                                        >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                                        </Avatar>
                                    </Table.Td>
                                    <Table.Td width={45}>
                                        <Badge
                                          variant="light"
                                          color="orange"
                                        >
                                            {p.number}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
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
