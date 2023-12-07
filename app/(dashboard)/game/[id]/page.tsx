'use client';

import { Badge, Card, CardSection, Container, Flex, Grid, Text } from '@mantine/core';
import {
  IconCalendar,
  IconChartBar,
  IconCircleLetterP,
  IconClock,
  IconHourglassEmpty,
  IconTournament,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';
import ButtonStartGame from '@/components/Buttons/ButtonStartGame';
import BadgeGameStatus from '@/components/Badges/BadgeGameStatus';
import BadgeCode from '@/components/Badges/BadgeCode';
import CounterCircles from '@/components/Counters/CounterCircles';
import DetailsViewAccordion from '@/components/Accordions/DetailsViewAccordion';
import GameStatsDetail from '@/components/DetailViews/GameStatsDetail';
import GamePlayersDetail from '@/components/DetailViews/GamePlayersDetail';
import { game } from '@/app/dev-data/data';

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
          <BadgeGameStatus status={game.GameStatus} size="lg" />
          <Flex gap={10}>
            <BadgeCode code={game.id} color="orange" />
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
                        {game.team1.name}
                      </Text>
                      <Text c="orange" fz={48} ff="mono45-headline" fw={700}>
                        {game.team1.score}
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
                        {game.team2.name}
                      </Text>
                      <Text c="orange" fz={48} ff="mono45-headline" fw={700}>
                        {game.team2.score}
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
                      <IconCalendar color="gray" />
                      <Text c="gray.6" tt="uppercase" fw={600} mb={10}>
                        Date
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        {game.dateTime.getMonth()}/{game.dateTime.getDate()}/
                        {game.dateTime.getFullYear().toString().slice(2)}
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconClock color="gray" />
                      <Text c="gray.6" tt="uppercase" fw={600} mb={10}>
                        Time
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        {game.dateTime.getHours()}:{game.dateTime.getMinutes()}
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>
            {/* League Section */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Flex align="center" direction="column">
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
                <Flex gap={10} align="center" mt={25} mb={10}>
                  <IconUsersGroup color="gray" />
                  <Text c="gray.6" tt="uppercase" fw={600}>
                    League
                  </Text>
                </Flex>
                <Text fw={700} size="lg">
                  {game.league ?? 'N/A'}
                </Text>
                <Flex gap={10} align="center" mt={30} mb={10}>
                  <IconTournament color="gray" />
                  <Text c="gray.6" tt="uppercase" fw={600}>
                    Tournament
                  </Text>
                </Flex>
                <Text fw={700} size="lg">
                  {game.tournament ?? 'N/A'}
                </Text>
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
                      <IconUsersGroup color="gray" />
                      <Text c="gray.6" tt="uppercase" fw={600} mb={8}>
                        Format
                      </Text>
                      <Badge color="orange" size="xl" lts={2} ff="mono45-headline">
                        {game.GameFormat}
                      </Badge>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconUsers color="gray" />
                      <Text c="gray.6" tt="uppercase" fw={600} mb={10}>
                        Players
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        {game.team1.players.length + game.team2.players.length}
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
                      <IconCircleLetterP color="gray" />
                      <Text c="gray.6" tt="uppercase" fw={600} mb={10}>
                        Periods
                      </Text>
                      <CounterCircles count={game.periods} max={4} radius={20} color="orange" />
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Flex direction="column" align="center" gap={5}>
                      <IconHourglassEmpty color="gray" />
                      <Text c="gray.6" tt="uppercase" fw={600} mb={10}>
                        Period Length
                      </Text>
                      <Text lh={0.7} c="orange" fz={36} ff="mono45-headline" fw={700}>
                        {game.periodLength}:00
                      </Text>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Grid.Col>
          </Grid>
        </CardSection>
      </Card>
      <DetailsViewAccordion
        items={[
          {
            title: 'Game Stats',
            icon: IconChartBar,
            content: <GameStatsDetail teams={{ team1: game.team1, team2: game.team2 }} />,
          },
          {
            title: 'Players',
            icon: IconUsersGroup,
            content: <GamePlayersDetail teams={{ team1: game.team1, team2: game.team2 }} />,
          },
        ]}
      />
    </Container>
  );
}
