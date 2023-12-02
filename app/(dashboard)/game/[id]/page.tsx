'use client';

import { ActionIcon, Badge, Card, CardSection, Container, Flex, Grid, Text } from '@mantine/core';
import {
  IconCalendar,
  IconCircleLetterP,
  IconClock,
  IconEdit,
  IconHourglassEmpty,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';
import ButtonStartGame from '@/components/Buttons/ButtonStartGame';
import BadgeGameStatus from '@/components/Badges/BadgeGameStatus';
import BadgeCode from '@/components/Badges/BadgeCode';
import CounterCircles from '@/components/Counters/CounterCircles';
import DetailsViewAccordion from '@/components/Accordions/DetailsViewAccordion';

export default function GameDetailView() {
  return (
    <Container size="md">
      <Card p={0} mb={20} radius="md" withBorder shadow="md" style={{ width: '100%' }}>
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
          <Grid gutter={40} mb={15}>
            {/* Teams Section */}
            <Grid.Col span={12}>
              <Flex align="center" direction="column" gap={25}>
                <Badge
                  style={{ width: '100%' }}
                  color="gray"
                  size="sm"
                  py={20}
                  px={15}
                  variant="light"
                >
                  <Text fw={800}>Teams</Text>
                </Badge>
                <Grid style={{ width: '100%' }} gutter={{ sm: 40, md: 20 }} pos="relative">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" mt={20}>
                      <Text size="xl" tt="uppercase" fw={700} mb={8}>
                        Golden State Warriors
                      </Text>
                      <Text c="orange" fz={48} ff="mono45-headline" fw={700}>
                        57
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Badge
                    variant="light"
                    pos="absolute"
                    top="45%"
                    left="50%"
                    color="orange"
                    size="lg"
                    lts={2}
                    fw={800}
                    style={{ translate: '-50% 50%' }}
                  >
                    VS
                  </Badge>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" mt={20}>
                      <Text size="xl" tt="uppercase" fw={700} mb={8}>
                        Los Angeles Lakers
                      </Text>
                      <Text c="orange" fz={48} ff="mono45-headline" fw={700}>
                        63
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>

            {/* Date Section */}
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
                  <Text fw={800}>Date</Text>
                </Badge>
                <Grid style={{ width: '100%' }} gutter={{ sm: 40, md: 20 }}>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconCalendar />
                      <Text tt="uppercase" fw={600} mb={10}>
                        Date
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        05/25/23
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconClock />
                      <Text tt="uppercase" fw={600} mb={10}>
                        Time
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        6:30PM
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>
            {/* League Section */}
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
                <Flex gap={10} mt={15}>
                  <Text fw={700} size="lg">
                    Waynesboro Mens League
                  </Text>
                  <ActionIcon color="orange" variant="light" aria-label="edit game tournament">
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
            {/* Game Size Section */}
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
                  <Text fw={800}>Game Size</Text>
                </Badge>
                <Grid style={{ width: '100%' }} gutter={{ sm: 40, md: 20 }}>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconUsersGroup />
                      <Text tt="uppercase" fw={600} mb={8}>
                        Format
                      </Text>
                      <Badge color="orange" size="xl" lts={2} ff="mono45-headline">
                        3x3
                      </Badge>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconUsers />
                      <Text tt="uppercase" fw={600} mb={10}>
                        Players
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        8
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>
            {/* Length Section */}
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
                  <Text fw={800}>Length</Text>
                </Badge>
                <Grid style={{ width: '100%' }} gutter={{ sm: 40, md: 20 }}>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconCircleLetterP />
                      <Text tt="uppercase" fw={600} mb={10}>
                        Periods
                      </Text>
                      <CounterCircles count={2} max={4} radius={20} color="orange" />
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconHourglassEmpty />
                      <Text tt="uppercase" fw={600} mb={10}>
                        Period Length
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        5:00
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>
          </Grid>
        </CardSection>
      </Card>
      <DetailsViewAccordion />
    </Container>
  );
}
