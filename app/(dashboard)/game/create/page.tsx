'use client';

import {
    Button,
    Divider,
    em,
    Grid,
    Group,
    List,
    NumberInput,
    Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { FormErrors, useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { UseFormReturnType } from '@mantine/form/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import TeamPlayersCard from '@/components/Cards/TeamPlayersCard';
import TeamSelect from '@/components/Dropdowns/TeamSelect';
import GameFormatSelect from '@/components/Dropdowns/GameFormatSelect';
import LoadingSuspense from '@/components/Utility/LoadingSuspense';

interface FormValues {
    dateTime: Date | undefined,
    gameFormatId: number | undefined,
    periodCount: number | undefined,
    periodLength: number | undefined,
    team1Id?: string | undefined,
    team2Id?: string | undefined,
    teamIds?: (string | undefined)[]
}

export default function CreateGame() {
    const { push } = useRouter();
    const [creating, setCreating] = useState(false);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    const form: UseFormReturnType<FormValues> = useForm<FormValues>({
        initialValues: {
            dateTime: undefined,
            gameFormatId: undefined,
            periodCount: undefined,
            periodLength: undefined,
            team1Id: undefined,
            team2Id: undefined,
        },
        validate: {
            dateTime: (value) => {
                if (!value) {
                    return 'Date is required';
                }
                if (value.getTime() <= Date.now()) {
                    return 'Date cannot be in the past';
                }
                return null;
            },
            gameFormatId: (value) => {
                if (!value) {
                    return 'Game format is required';
                }
                if (value < 1 || value > 5) {
                    return 'Game format value out of range (1-5)';
                }
                return null;
            },
            periodCount: (value) => {
                if (!value) {
                    return 'Period count is required';
                }
                if (value < 1 || value > 4) {
                    return 'Period count value out of range (1-4)';
                }
                return null;
            },
            periodLength: (value) => {
                if (!value) {
                    return 'Period length is required';
                }
                if (value < 1 || value > 20) {
                    return 'Period length value out of range (1-20)';
                }
                return null;
            },
            team1Id: (value) => {
                if (!value) {
                    return 'Team is required';
                }
                return null;
            },
            team2Id: (value) => {
                if (!value) {
                    return 'Team is required';
                }
                if (value === form.values.team1Id) {
                    return 'Teams cannot be the same';
                }
                return null;
            },
        },
        transformValues: (values) => ({
            dateTime: values.dateTime,
            gameFormatId: +values!.gameFormatId! || undefined,
            periodCount: values.periodCount,
            periodLength: values.periodLength,
            teamIds: [values.team1Id, values.team2Id],
        }),
    });

    async function onSubmit(data: FormValues) {
        try {
            setCreating(true);
            notifications.show({
                id: 'creating-game',
                title: 'Creating Game',
                message: 'Please wait while your game is added. It will only' +
                    ' take a few seconds!',
                color: 'orange',
                loading: true,
                withBorder: true,
                radius: 'md',
            });
            const res = await axios.post('../api/game', data);
            notifications.update({
                id: 'creating-game',
                title: 'Game Created',
                message: 'Game successfully created, navigating to new game' +
                    ' page',
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconCheck />,
                radius: 'md',
                autoClose: 4000,
            });
            push(`../game/${res.data.id}`);
        } catch (e: any) {
            notifications.update({
                id: 'creating-game',
                title: 'Error',
                message: e.response.message,
                color: 'green',
                loading: false,
                withBorder: true,
                icon: <IconX />,
                radius: 'md',
                autoClose: 4000,
            });
            setCreating(false);
        }
    }

    // TODO abstract to hook
    function notifyFormErrors(errors: FormErrors) {
        const errorListItems = Object
            .values(errors)
            .map(e => (
                <List.Item>{e}</List.Item>
            ));

        const errorList = (
            <List
              size="md"
              center
              my={5}
              icon={<IconX color="red" size={18} />}
            >
                {errorListItems}
            </List>
        );

        notifications.show({
            id: 'form-errors',
            color: 'red',
            title: 'One or more fields have errors',
            message: errorList,
            withBorder: true,
            autoClose: 4000,
        });
    }

    return (
        <LoadingSuspense
          loading={creating}
          loadingText="Creating game, please wait..."
        >
            <Title order={1} mb="lg">Create Game</Title>
            <form onSubmit={form.onSubmit(
                (values) => onSubmit(values),
                notifyFormErrors
            )}
            >
                <Grid pt={30} gutter={30} align="center">
                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <DateTimePicker
                          valueFormat="MMMM DD, YYYY @ hh:mm A"
                          label="Date & Time"
                          size="lg"
                          description="When is this game taking place?"
                          placeholder="Enter date..."
                          dropdownType={isMobile ? 'modal' : 'popover'}
                          style={{
                                width: '100%',
                            }}
                          {...form.getInputProps('dateTime')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <GameFormatSelect
                          {...form.getInputProps('gameFormatId')}
                          label="Team Format"
                          placeholder="Select team format"
                          description="How many players per team?"
                          size="lg"
                          allowDeselect={false}
                        />
                    </Grid.Col>
                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <NumberInput
                          suffix=" Period(s)"
                          size="lg"
                          label="Period Count"
                          description="How many periods will be played?"
                          placeholder="Periods"
                          min={1}
                          max={4}
                          {...form.getInputProps('periodCount')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <NumberInput
                          suffix=" Minute(s)"
                          size="lg"
                          label="Period Length"
                          description="How long will each period be?"
                          placeholder="Minutes"
                          min={1}
                          max={20}
                          {...form.getInputProps('periodLength')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Divider />
                    </Grid.Col>
                    <Grid.Col
                      span={{
                            base: 12,
                            sm: 6,
                        }}
                    >
                        <TeamSelect
                          size="lg"
                          radius="md"
                          label="Team 1"
                          inputProps={{
                                error: form.getInputProps('team1Id').error,
                                setValue: (val) => {
                                    form.setFieldValue('team1Id', val);
                                },
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <TeamPlayersCard
                          teamId={+form.values.team1Id!}
                          label="Team 1"
                        />
                    </Grid.Col>
                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <TeamSelect
                          size="lg"
                          radius="md"
                          label="Team 2"
                          inputProps={{
                                error: form.getInputProps('team2Id').error,
                                setValue: (val) => {
                                    form.setFieldValue('team2Id', val);
                                },
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={{
                        base: 12,
                        sm: 6,
                    }}
                    >
                        <TeamPlayersCard
                          teamId={+form.values.team2Id!}
                          label="Team 2"
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="center" mt="xl">
                    <Button
                      variant="light"
                      color="red"
                      component={Link}
                      href="../game"
                    >Back
                    </Button>

                    <Button
                      color="orange"
                      type="submit"
                    >Create Game
                    </Button>
                </Group>
            </form>
        </LoadingSuspense>
    );
}
