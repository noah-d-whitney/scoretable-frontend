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

//TODO control fields and form state
//TODO add step icons
export default function CreateTeam() {
    const [active, setActive] = useState(0);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const form = useForm({
        initialValues: {
            name: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    name:
                        values.name.trim().length < 6
                            ? 'Username must include at least 6 characters'
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
                            <MultiSelect
                              required
                              radius="md"
                              label="Players"
                              description="Optionally assign players to this team"
                              data={['1V1', '2V2', '3V3', '4V4', '5V5']}
                              size="lg"
                              style={{
                                    width: '100%',
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="Assign Teams">
                    Create Assignment fields
                    {/*TODO create assignment fields*/}
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
                        <Button
                          color="orange"
                          onClick={nextStep}
                        >{active === 2 ? 'Create Team' : 'Next Step'}
                        </Button>
                    </Group>
            }
        </>
    );
}
