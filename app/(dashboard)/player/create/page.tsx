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
import TeamPlayersCard from '@/components/Cards/TeamPlayersCard';

export default function CreatePlayer() {
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
              color="orange"
            >Create Player
            </Button>
        </Group>
           </>;
}
