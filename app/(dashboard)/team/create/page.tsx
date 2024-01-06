'use client';

import { useState } from 'react';
import { Button, Grid, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PlayerMultiSelect from '@/components/Dropdowns/PlayerMultiSelect';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';

interface FormValues {
    name: string,
    playerObjs?: { name: string, id: string }[],
    playerIds: number[]
}

export default function CreateTeam() {
    const { push } = useRouter();
    const [creating, setCreating] = useState(false);

    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            playerObjs: [],
            playerIds: [],
        },
        validate: {
            name: (value) => value.trim().length < 6
                ? 'Team name must be at least 6 characters'
                : null,
            playerObjs: (value) => value?.length! < 1
                ? 'You must assign at least one player to a team'
                : null,
        },
        transformValues: (values) => ({
            name: values.name,
            playerIds: values.playerObjs ? values.playerObjs.map(p => +p.id) : [],
        }),
    });

    async function onSubmit() {
        try {
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
            setCreating(true);
            const createdTeam = await axios.post('../api/team', form.getTransformedValues());
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
            push(`../team/${createdTeam.data.id}`);
        } catch (e: any) {
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
            setCreating(false);
        }
    }

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
                    <PlayerMultiSelect
                      radius="md"
                      description="Optionally assign players to this team"
                      inputProps={{
                            form,
                            formFieldName: 'playerObjs',
                            value: form.getInputProps('playerObjs').value,
                        }}
                      size="lg"
                      withAsterisk
                      style={{
                            width: '100%',
                        }}
                    />
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
                  type="submit"
                >Create Team
                </Button>
            </Group>
        </form>
           </LoadingSuspense>;
}
