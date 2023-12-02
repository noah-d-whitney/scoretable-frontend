'use client';

import { ActionIcon, Badge, Card, CardSection, Container, Flex, Grid, Text } from '@mantine/core';
import { IconCircleLetterP, IconClock, IconEdit, IconTournament } from '@tabler/icons-react';
import ButtonStartGame from '@/components/Buttons/ButtonStartGame';
import BadgeGameStatus from '@/components/Badges/BadgeGameStatus';
import BadgeCode from '@/components/Badges/BadgeCode';

export default function GameDetailView() {
  return (
    <Container size="md">
      <Card p={0} h={600} radius="md" withBorder shadow="md" style={{ width: '100%' }}>
        <CardSection
          withBorder
          pt={35}
          pb={20}
          px={35}
          display="flex"
          style={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <BadgeGameStatus status="not-started" size="lg" />
          <Flex gap={10}>
            <BadgeCode code="5kx4r" color="orange" />
            <ButtonStartGame />
          </Flex>
        </CardSection>
        <CardSection py={35} px={50}>
          <Grid gutter={40}>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Flex align="center" direction="column" gap={25}>
                <Badge
                  style={{ width: '100%' }}
                  color="gray"
                  size="sm"
                  py={20}
                  px={15}
                  variant="light"
                >
                  <Text fw={800}>Tourney</Text>
                </Badge>
                <Flex gap={10}>
                  <Text fw={700} size="lg">
                    Waynesboro 3x3 2023
                  </Text>
                  <ActionIcon color="orange" variant="light" aria-label="edit game tournament">
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Flex align="center" direction="column" gap={25}>
                <Badge
                  style={{ width: '100%' }}
                  color="gray"
                  size="sm"
                  py={20}
                  px={15}
                  variant="light"
                >
                  <Text fw={800}>League</Text>
                </Badge>
                <Flex gap={10}>
                  <Text fw={700} size="lg">
                    Waynesboro Mens League
                  </Text>
                  <ActionIcon color="orange" variant="light" aria-label="edit game tournament">
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Flex align="center" direction="column" gap={25}>
                <Badge
                  style={{ width: '100%' }}
                  color="gray"
                  size="sm"
                  py={20}
                  px={15}
                  variant="light"
                >
                  <Text fw={800}>Format</Text>
                </Badge>
                <Flex gap={10}>
                  <Text fw={700} size="lg">
                    Waynesboro Mens League
                  </Text>
                  <ActionIcon color="orange" variant="light" aria-label="edit game tournament">
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Flex align="center" direction="column" gap={25}>
                <Badge
                  style={{ width: '100%' }}
                  color="gray"
                  size="sm"
                  py={20}
                  px={15}
                  variant="light"
                >
                  <Text fw={800}>Format</Text>
                </Badge>
                <Grid style={{ width: '100%' }}>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={10}>
                      <IconCircleLetterP />
                      <Text tt="uppercase" fw={600}>
                        Periods
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={10}>
                      <IconClock />
                      <Text tt="uppercase" fw={600}>
                        Period Length
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>
          </Grid>
        </CardSection>
      </Card>
    </Container>
  );
}
