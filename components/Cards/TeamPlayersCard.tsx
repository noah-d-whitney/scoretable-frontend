import {
    Avatar,
    Badge,
    Card,
    Center,
    Divider,
    Flex,
    List,
    Loader,
    Text,
    Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TeamDto } from '@/app/api/types';

type CardState = 'loading' | 'inactive' | 'active' | 'error';

interface TeamPlayersCardProps {
    teamId: number | undefined | null;
    label?: string;
}

export default function TeamPlayersCard(props: TeamPlayersCardProps) {
    const {
        teamId,
        label,
    } = props;
    const [cardState, setCardState] = useState<CardState>(() => {
        if (!teamId) return 'inactive';
        return 'loading';
    });
    const [team, setTeam] = useState<TeamDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function fetchTeam(id: number): Promise<void> {
        try {
            const fetchedTeam = await axios.get(`../api/team/${id}`);
            setTeam(fetchedTeam.data);
            console.log(fetchedTeam);
        } catch (e: any) {
            setError(e.response.message);
            setCardState('error');
        }
    }

    useEffect(() => {
        if (teamId) {
            setCardState('loading');
            fetchTeam(teamId)
                .then(() => setCardState('active'));
        } else {
            setCardState('inactive');
        }
    }, [teamId]);

    return <Card
      shadow="sm"
      padding="md"
      withBorder
      mih={150}
    >
        {cardState === 'loading'
            ? (<Center h={150}>
                <Loader size="md" />
               </Center>)
            : null
        }

        {cardState === 'inactive'
            ? <Flex align="center" justify="center" h={150}>
                <Text size="lg" c="gray">No Team Selected</Text>
              </Flex>
            : null
        }

        {cardState === 'error'
            ? <Flex align="center" justify="center" h={150}>
                <Text size="lg" c="red">{error}</Text>
              </Flex>
            : null
        }

        {cardState === 'active'
            ? (<>
                <Flex
                  justify="space-between"
                  direction="column"
                  gap={10}
                  my="sm"
                >
                    <Badge color="orange">{label || 'Team'}</Badge>
                    <Title order={3}>
                        {team?.name}
                    </Title>
                </Flex>
                <Divider />
                <Flex
                  component={List}
                  type="unordered"
                  listStyleType="none"
                  gap={25}
                  wrap="wrap"
                  mt="md"

                >
                    {team?.players.map(p => (
                        <List.Item
                          icon={<Avatar
                            src={null}
                            alt="Vitaly Rtishchev"
                            color="orange"
                            size="sm"
                          >
                                {p.number}
                                </Avatar>}
                          key={p.id}
                        >
                            {p.firstName} {p.lastName}
                        </List.Item>
                    ))}
                </Flex>
               </>)
            : null
        }

           </Card>;
}
