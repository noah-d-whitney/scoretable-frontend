'use client';

import {
    Button,
    Grid,
    Group,
    NumberInput,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';
import usePlayers, { createPlayerDto } from '@/hooks/usePlayers';

export default function CreatePlayer() {
    const {
        createPlayer,
        loading,
        error,
    } = usePlayers();
    const form = useForm<createPlayerDto>({
        initialValues: {
            first_name: '',
            last_name: '',
            pref_number: 0,
        },
        validate: {
            first_name: (value) => value.trim().length < 3
                ? 'First name must be at least 3 characters'
                : null,
            last_name: (value) => value.trim().length < 3
                ? 'Last name must be at least 3 characters'
                : null,
            pref_number: (value) => {
                if (value === null) {
                    return 'Default number is required';
                }
                if (value < 0 || value > 99) {
                    return 'Number must be between 0-99';
                }
                return null;
            },
        },
    });

    // async function onSubmit() {
    //     try {
    //         notifications.show({
    //             id: 'creating-player',
    //             title: 'Creating Player',
    //             message: 'Please wait while your player is added. It will' +
    //                 ' only take a few seconds!',
    //             color: 'orange',
    //             loading: true,
    //             withBorder: true,
    //             radius: 'md',
    //         });
    //         const createdPlayer = await axios.post('../api/player', form.values);
    //         notifications.update({
    //             id: 'creating-player',
    //             title: 'Player Created',
    //             message: 'Player successfully created, navigating to new' +
    //                 ' player page',
    //             color: 'green',
    //             loading: false,
    //             withBorder: true,
    //             icon: <IconCheck />,
    //             radius: 'md',
    //             autoClose: 5000,
    //         });
    //         push(`../player/${createdPlayer.data.id}`);
    //     } catch (e: any) {
    //         notifications.update({
    //             id: 'creating-game',
    //             title: 'Error',
    //             message: e.response.message,
    //             color: 'green',
    //             loading: false,
    //             withBorder: true,
    //             icon: <IconCheck />,
    //             radius: 'md',
    //             autoClose: 5000,
    //         });
    //         setCreating(false);
    //     }
    // }

    async function onSubmit() {
        console.log(form.values);
        await createPlayer(form.values)
            .catch(() => {
                form.setErrors(error);
            });
    }

    return (
        <LoadingSuspense
          loading={loading}
          loadingText="Creating player, please wait..."
        >
            <Title order={1} mb="xl">Create Player</Title>
            <form onSubmit={onSubmit}>
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
                          placeholder="Michael"
                          withAsterisk
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
                          placeholder="Jordan"
                          withAsterisk
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
                          withAsterisk
                          {...form.getInputProps('number')}
                        />
                    </Grid.Col>
                </Grid>
                <Group justify="center" mt="xl">
                    <Button
                      variant="light"
                      color="red"
                      component={Link}
                      href="../player"
                    >Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="orange"
                    >Create Player
                    </Button>
                </Group>
            </form>
        </LoadingSuspense>);
}
