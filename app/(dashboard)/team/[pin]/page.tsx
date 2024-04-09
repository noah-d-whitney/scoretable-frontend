'use client';

import { Badge, Card, Flex, Table, Title } from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import useTeams, { teamDto } from '@/hooks/useTeams';

export default function TeamDetailView({ params }: { params: { pin: string } }) {
    const { pin } = params;
    const {
        getTeam,
        loading,
    } = useTeams();
    const [team, setTeam] = useState<teamDto | null>(null);

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
                <Card
                  withBorder
                  shadow="md"
                  radius="md"
                  px="md"
                >
                    <Table
                      verticalSpacing="md"
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Td />
                                <Table.Td>Name</Table.Td>
                                <Table.Td>#</Table.Td>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {t.players.map(p =>
                                <Table.Tr>
                                    <Table.Td>{p.lineup_pos}</Table.Td>
                                    <Table.Td>{p.first_name}</Table.Td>
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
