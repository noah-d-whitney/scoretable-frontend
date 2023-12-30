'use client';

import {useState} from 'react';
import {
    Stepper,
    Button,
    Group,
    em,
    Container,
    Title,
    Flex, Select, Grid,
    NumberInput
} from '@mantine/core';
import {useMediaQuery} from '@mantine/hooks';
import {DateTimePicker} from '@mantine/dates';

export default function CreateGame() {
    const [active, setActive] = useState(1);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    return (
        <Container p={30}>
            <Title order={1} mb="xl">Create Game</Title>
            <Stepper active={active} onStepClick={setActive} color="orange"
                     size="lg" radius="md"
                     orientation={isMobile ? 'vertical' : 'horizontal'}>
                <Stepper.Step label="Step 1" description="Game Info">
                    <Grid pt={30} gutter={30}>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <Select
                                required
                                radius="md"
                                label="Team Format"
                                placeholder="Select team format"
                                description="How many players per team?"
                                data={['1V1', '2V2', '3V3', '4V4', '5V5']}
                                size="lg"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <NumberInput
                                required
                                suffix=" Period(s)"
                                size="lg"
                                label="Period Count"
                                description="How many periods will be played?"
                                placeholder="Periods"
                                min={1}
                                max={4}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <NumberInput
                                required
                                suffix=" Minute(s)"
                                size="lg"
                                label="Period Length"
                                description="How long will each period be?"
                                placeholder="Minutes"
                                min={1}
                                max={20}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}></Grid.Col>
                    </Grid>
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="Teams & Players">
                    Step 3 content: Teams & Players
                </Stepper.Step>
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>
            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button color="orange" onClick={nextStep}>Next step</Button>
            </Group>
        </Container>
    );
}
