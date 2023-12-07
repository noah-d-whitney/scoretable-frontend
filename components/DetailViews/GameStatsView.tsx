import { Avatar, Flex, Grid, Paper, Text } from '@mantine/core';
import { TeamGameDetails } from '@/app/api/types';

export default function GameStatsView({ teams }: { teams: TeamGameDetails }) {
  return (
    <Flex p={5} align="center" justify="center" direction="column">
      <Flex
        bg="orange"
        p={15}
        gap={45}
        align="center"
        justify="center"
        style={{ borderRadius: 10, width: '100%' }}
        component={Paper}
      >
        <Avatar size="lg" variant="white" color="orange">
          LAL
        </Avatar>
        <Text fw={700} fz={24} c="white">
          VS
        </Text>
        <Avatar size="lg" variant="white" color="orange">
          DN
        </Avatar>
      </Flex>
      <Grid w={300} ta="center" align="center" pt={20}>
        <Grid.Col span={4} p={0}>
          <Text lh={1} fz={48} lts={1.5} ff="mono45-headline" fw={700}>
            {teams.team1.score}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={26} fw={600} tt="uppercase">
            Score
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            fz={48}
            ff="mono45-headline"
            fw={700}
            lts={1.5}
            lh={1}
            c={teams.team2.score > teams.team1.score ? 'orange' : undefined}
          >
            {teams.team2.score}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700}>
            12/21
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            FG
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            ff="mono45-headline"
            fw={700}
            lts={1.5}
            c={teams.team2.score > teams.team1.score ? 'orange' : undefined}
          >
            14/25
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700} c="orange">
            57%
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            FG%
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700}>
            56%
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700} c="orange">
            4/5
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            3pt
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700}>
            3/6
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700}>
            2/3
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            FT
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700} c="orange">
            5/5
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700}>
            10
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            RB
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700} c="orange">
            13
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700}>
            4
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            TO
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text lh={1} fz={36} lts={1.5} ff="mono45-headline" fw={700} c="orange">
            3
          </Text>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}
