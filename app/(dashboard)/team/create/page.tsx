'use client';

import { Button, Grid, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import useTeams, { createTeamDto } from '@/hooks/useTeams';
import TeamPlayersMultiSelect from './TeamPlayerMultiSelect';
import TeamPlayersLineupInput from './TeamPlayersLineupInput';
import { useState } from 'react';

export default function CreateTeam() {
    const { push } = useRouter();
    const { createTeam, creating } = useTeams();
    const [selectedPlPins, setSelectedPlPins] = useState<string[]>([]);
    const form = useForm<createTeamDto>({
        initialValues: {
            name: '',
            player_ids: [],
            player_lineup: [],
            player_nums: [],
        },
        onValuesChange: (values) => {
            setSelectedPlPins(values.player_ids);
        }
    });

    async function onSubmit(team: createTeamDto) {
        notifications.show({
            id: 'creating-team',
            title: 'Creating Team',
            message: 'Please wait while your team is added. It will' +
                ' only take a few seconds!',
            color: 'orange',
            loading: true,
            withBorder: true,
            radius: 'md',
        });
        createTeam(team)
            .then(t => {
                push(`/team/${t.pin}`)
                notifications.update({
                    id: 'creating-team',
                    title: 'Team Created',
                    message: 'Team successfully created, navigating to new' +
                        ' player page',
                    color: 'green',
                    loading: false,
                    withBorder: true,
                    icon: <IconCheck />,
                    radius: 'md',
                    autoClose: 5000,
                });
            })
            .catch(e => {
                form.setErrors(e);
                notifications.update({
                    id: 'creating-team',
                    title: 'Error',
                    message: e.message,
                    color: 'red',
                    loading: false,
                    withBorder: true,
                    icon: <IconX />,
                    radius: 'md',
                    autoClose: 5000,
                });
            });
    }

    const formVals = form.getValues()

    return <LoadingSuspense
        loading={creating}
        loadingText="Creating Team, Please Wait..."
    >
        <Title order={1} mb="xl">
            Create Team
        </Title>
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Grid pt={30} gutter={30}>
                <Grid.Col span={12}>
                    <TextInput
                        radius="md"
                        label="Team Name"
                        placeholder="Golden State Warriors"
                        size="lg"
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TeamPlayersMultiSelect {...form.getInputProps('player_ids', { withFocus: false, withError: false })} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TeamPlayersLineupInput playerPins={selectedPlPins} {...form.getInputProps('player_lineup')} />
                </Grid.Col>
            </Grid>

            <Group justify="center" mt="xl">
                <Button
                    variant="default"
                    component={Link}
                    href="/team"
                >Back
                </Button>
                <Button
                    color="orange"
                    //type="submit"
                    onClick={() => console.log(JSON.stringify(formVals.player_lineup))}
                >Create Team
                </Button>
            </Group>
        </form>
    </LoadingSuspense>;
}
