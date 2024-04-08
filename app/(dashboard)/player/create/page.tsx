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
        creating,
    } = usePlayers();
    const form = useForm<createPlayerDto>({
        initialValues: {
            first_name: '',
            last_name: '',
            pref_number: 0,
        },
        // validate: {
        //     first_name: (value) => value.trim().length < 3
        //         ? 'First name must be at least 3 characters'
        //         : null,
        //     last_name: (value) => value.trim().length < 3
        //         ? 'Last name must be at least 3 characters'
        //         : null,
        //     pref_number: (value) => {
        //         if (value === null) {
        //             return 'Default number is required';
        //         }
        //         if (value < 0 || value > 99) {
        //             return 'Number must be between 0-99';
        //         }
        //         return null;
        //     },
        // },
    });

    async function onSubmit() {
        console.log(form.values);
        await createPlayer(form.values)
            .catch((e) => form.setErrors(e));
    }

    return (
        <LoadingSuspense
          loading={creating}
          loadingText="Creating player, please wait..."
        >
            <Title order={1} mb="xl">Create Player</Title>
            <form onSubmit={form.onSubmit(onSubmit)}>
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
                          {...form.getInputProps('first_name')}
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
                          {...form.getInputProps('last_name')}
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
                          {...form.getInputProps('pref_number')}
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
