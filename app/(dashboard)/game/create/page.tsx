'use client';

import { useState } from 'react';
import {
    Button,
    Checkbox,
    Divider,
    em,
    Flex,
    Grid,
    Group,
    Loader,
    NumberInput,
    Select,
    Stepper,
    Text,
    Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import axios from 'axios';
import TeamPlayersCard from '@/components/Cards/TeamPlayersCard';
import TeamSelect from '@/components/Dropdowns/TeamSelect';
import GameFormatSelect from '@/components/Dropdowns/GameFormatSelect';

//TODO control fields and form state
//TODO add step icons
export default function CreateGame() {
    const [active, setActive] = useState(0);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const form = useForm({
        initialValues: {
            dateTime: null,
            gameFormatId: null,
            periodCount: null,
            periodLength: null,
            team1Id: null,
            team2Id: null,
        },
        validate: {
            team1Id: (value) => value === form.values.team2Id ? 'Teams' +
                ' cannot be the same' : null,
            team2Id: (value) => value === form.values.team1Id ? 'Teams cannot be the same' : null,
        },
        transformValues: (values) => ({
            dateTime: values.dateTime,
            gameFormatId: +values.gameFormatId,
            periodCount: values.periodCount,
            periodLength: values.periodLength,
            teamIds: [values.team1Id, values.team2Id],
        }),
    });

    async function onSubmit() {
        form.validate();
        const res = await axios.post('../api/game', form.getTransformedValues());
        console.log(res);
    }

    return (
        <>
            <Title order={1} mb="xl">Create Game</Title>
            <Stepper
              active={active}
              onStepClick={setActive}
              color="orange"
              size="lg"
              radius="md"
              orientation={isMobile ? 'vertical' : 'horizontal'}
            >
                <Stepper.Step label="Step 1" description="Game Info">
                    <Grid pt={30} gutter={30}>
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        >
                            {/*TODO Fix styles*/}
                            <DateTimePicker
                              valueFormat="MMMM DD, YYYY @ hh:mm A"
                              label="Date & Time"
                              size="lg"
                              radius="md"
                              required
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
                            <Select
                              radius="md"
                              label="League"
                              placeholder="Select league"
                              description="Assign this game to a league?"
                              data={['React', 'Angular', 'Vue', 'Svelte']}
                              searchable
                              size="lg"
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
                            <Select
                              radius="md"
                              label="Tournament"
                              placeholder="Select tournament"
                              description="Assign this game to a tournament?"
                              data={['React', 'Angular', 'Vue', 'Svelte']}
                              searchable
                              size="lg"
                              style={{
                                    width: '100%',
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Step 2" description="Game Format">
                    <Grid pt={30} gutter={30}>
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        >
                            <GameFormatSelect
                              {...form.getInputProps('gameFormatId')}
                              required
                              radius="md"
                              label="Team Format"
                              placeholder="Select team format"
                              description="How many players per team?"
                              size="lg"
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
                            <NumberInput
                              required
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
                              required
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
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        />
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="Teams & Players">
                    <Grid pt={30} gutter={30} align="center">
                        <Grid.Col span={12}>
                            {/*TODO Add create team view*/}
                            <Checkbox
                              defaultChecked
                              label="Use Existing Teams"
                              description="Uncheck to create team"
                              color="orange"
                              radius="md"
                              size="lg"
                              disabled
                            />
                            <Divider mt="lg" />
                        </Grid.Col>
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        >
                            <TeamSelect
                              size="lg"
                              radius="md"
                              label="Team 1"
                              required
                              {...form.getInputProps('team1Id')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        >
                            <TeamPlayersCard />
                        </Grid.Col>
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        >
                            <TeamSelect
                              size="lg"
                              radius="md"
                              label="Team 1"
                              required
                              {...form.getInputProps('team2Id')}
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
                </Stepper.Step>
                <Stepper.Completed>
                    <Flex
                      py="xl"
                      direction="column"
                      gap={20}
                      align="center"
                      justify="space-between"
                    >
                        <Loader color="orange" size="lg" />
                        <Text span>Creating Game, Please Wait...</Text>
                    </Flex>
                </Stepper.Completed>
            </Stepper>
            {
                active === 3 ? null :
                    <Group justify="center" mt="xl">
                        <Button
                          variant="default"
                          onClick={prevStep}
                        >Back
                        </Button>
                        {active < 2
                            ? <Button
                                color="orange"
                                onClick={nextStep}
                            >Next Step
                              </Button>
                            : <Button
                                color="orange"
                                onClick={onSubmit}
                            >Create Team
                              </Button>}
                    </Group>
            }
        </>
    );
}
