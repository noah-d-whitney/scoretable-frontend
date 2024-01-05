'use client';

import {
    Button,
    Divider,
    Grid,
    Group,
    MultiSelect,
    NumberInput,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TeamPlayersCard from '@/components/Cards/TeamPlayersCard';

export default function CreatePlayer() {
    const { push } = useRouter();
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            number: null,
        },
    });

    //TODO validate form before operation

    async function onSubmit() {
        try {
            notifications.show({
                id: 'creating-player',
                title: 'Creating Player',
                message: 'Please wait while your player is added. It will' +
                    ' only take a few seconds!',
                color: 'orange',
                loading: true,
                withBorder: true,
                radius: 'md',
            });
            const res = await axios.post('../api/player', form.values);
            notifications.update({
                id: 'creating-player',
                title: 'Player Created',
                message: 'Player successfully created, navigating to new' +
                    ' player page',
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconCheck />,
                radius: 'md',
                autoClose: 5000,
            });
            push('/player');
            console.log(res);
        } catch (e: any) {
            notifications.update({
                id: 'creating-game',
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

    return <>
        <Title order={1} mb="xl">Create Player</Title>
        <Grid my={30} gutter={30}>
            <Grid.Col span={{
                base: 12,
                sm: 6,
            }}
            >
                <TextInput
                  size="lg"
                  radius="md"
                  label="First Name"
                  placeholder="Michael Jordan"
                  required
                  {...form.getInputProps('firstName')}
                />
            </Grid.Col>
            <Grid.Col span={{
                base: 12,
                sm: 6,
            }}
            >
                <TextInput
                  size="lg"
                  radius="md"
                  label="Last Name"
                  placeholder="Michael Jordan"
                  required
                  {...form.getInputProps('lastName')}
                />
            </Grid.Col>
            <Grid.Col span={{
                base: 12,
                sm: 6,
            }}
            >
                <NumberInput
                  size="lg"
                  radius="md"
                  label="Default Player Number"
                  placeholder="23"
                  min={0}
                  max={99}
                  required
                  {...form.getInputProps('number')}
                />
            </Grid.Col>
        </Grid>
        <Divider />
        <Grid my={30} gutter={30} align="center">
            <Grid.Col
              span={{
                    base: 12,
                    sm: 6,
                }}
            >
                <MultiSelect
                  required
                  radius="md"
                  label="Assign to Teams"
                  description="Optionally assign players to one or more teams"
                  placeholder="Los Angeles Lakers"
                  data={['1V1', '2V2', '3V3', '4V4', '5V5']}
                  size="lg"
                  searchable
                  style={{
                        width: '100%',
                    }}
                />
            </Grid.Col>
            <Grid.Col span={{
                base: 12,
                sm: 6,
            }}
            >
                <TeamPlayersCard />
            </Grid.Col>
        </Grid>
        <Group justify="center" mt="xl">
            <Button
              variant="light"
              color="red"
            >Cancel
            </Button>
            <Button
              type="submit"
              onClick={onSubmit}
              color="orange"
            >Create Player
            </Button>
        </Group>
           </>;
}
