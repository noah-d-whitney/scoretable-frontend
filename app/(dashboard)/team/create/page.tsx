'use client';

import { useState } from 'react';
import {
    Button,
    em,
    Flex,
    Grid,
    Group,
    Loader,
    MultiSelect,
    Stepper,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import PlayerMultiSelect from '@/components/Dropdowns/PlayerMultiSelect';

//TODO control fields and form state
//TODO add step icons
interface FormValues {
    name: string,
    players: string[]
}

export default function CreateTeam() {
    const { push } = useRouter();
    const [active, setActive] = useState(0);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            players: [],
        },
        validate: (values) => {
            if (active === 0) {
                return {
                    name:
                        values.name.trim().length < 6
                            ? 'Team name must include at least 6 characters'
                            : null,
                };
            }

            return {};
        },
    });
    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
            const res = await axios.post('../api/team', form.values);
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
            push('/team');
            console.log(res);
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
            console.log(e);
        }
    }

    console.log(form.values);

    return (
        <>
            <Title order={1} mb="xl">Create Team</Title>
            <Stepper
              active={active}
              onStepClick={setActive}
              color="orange"
              size="lg"
              radius="md"
              orientation={isMobile ? 'vertical' : 'horizontal'}
            >
                <Stepper.Step label="Step 1" description="Team Info">
                    <Grid pt={30} gutter={30}>
                        <Grid.Col span={{
                            base: 12,
                            sm: 6,
                        }}
                        >
                            <TextInput
                              radius="md"
                              label="Team Name"
                              placeholder="Golden State Warriors"
                              size="lg"
                              width="full"
                              {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Step 2" description="Assign Players">
                    <Grid pt={30} gutter={30}>
                        <Grid.Col span={12}>
                            {/*TODO extract and make custom pills*/}

                            <PlayerMultiSelect
                              radius="md"
                              inputProps={{
                                    form,
                                    value: form.getInputProps('players').value,
                                    error: form.getInputProps('players').value,
                                }}
                              label="Players"
                              description="Optionally assign players to this team"
                              size="lg"
                              style={{
                                    width: '100%',
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="Assign Teams">
                    {/*TODO create assignment fields*/}
                    <Grid pt={30} gutter={30}>
                        <Grid.Col span={12}>
                            {/*TODO extract and make custom pills*/}
                            <MultiSelect
                              required
                              radius="md"
                              label="Players"
                              description="Optionally assign this team to game(s)"
                              data={['1V1', '2V2', '3V3', '4V4', '5V5']}
                              size="lg"
                              style={{
                                    width: '100%',
                                }}
                            />
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
                        <Text span>Creating Team, Please Wait...</Text>
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
                        {active === 2
                            ? <Button
                                color="orange"
                                onClick={onSubmit}
                            >Create Team
                              </Button>
                            : <Button
                                color="orange"
                                onClick={nextStep}
                            >Next Step
                              </Button>}
                    </Group>
            }
        </>
    );
}
