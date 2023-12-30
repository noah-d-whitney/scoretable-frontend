'use client';

import { useState } from 'react';
import {
    Stepper,
    Button,
    Group,
    em,
    Container,
    Title,
    Flex, Select
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {DateTimePicker} from "@mantine/dates";

export default function CreateGame() {
    const [active, setActive] = useState(1);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    return (
        <Container p={30}>
            <Title order={1} mb="xl">Create Game</Title>
            <Stepper active={active} onStepClick={setActive} color="orange" size="lg" radius="md" orientation={isMobile ? 'vertical' : 'horizontal'}>
                <Stepper.Step label="Step 1" description="Game Info">
                    <Flex pt={30} direction="column" gap={25}>
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
                              width: isMobile ? '100%' : 350,
                          }}
                        />
                        <Select
                          label="Your favorite library"
                          placeholder="Pick value"
                          description="Select League"
                          data={['React', 'Angular', 'Vue', 'Svelte']}
                          searchable
                          size="lg"
                          style={{
                              width: isMobile ? '100%' : 350,
                          }}
                        />
                    </Flex>
                </Stepper.Step>
                <Stepper.Step label="Step 2" description="Game Format">
                    Step 2 content: Set Format
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
