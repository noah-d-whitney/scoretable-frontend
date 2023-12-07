import { Avatar, Flex, Grid, Paper, Text } from '@mantine/core';
import { TeamGameDetails } from '@/app/api/types';
import { CalcGameStats } from '@/utils/CalculateStats';

export default function GameStatsView({ teams }: { teams: TeamGameDetails }) {
  const team1Stats = CalcGameStats(teams.team1);
  const team2Stats = CalcGameStats(teams.team2);
  return (
    <Flex p={5} align="center" justify="center" direction="column">
      <Flex
        bg="orange"
        p={15}
        gap={60}
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
          <Text
            lh={1}
            fz={48}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.score > team2Stats.score ? 'orange' : undefined}
          >
            {team1Stats.score}
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
            c={team2Stats.score > team1Stats.score ? 'orange' : undefined}
          >
            {team2Stats.score}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.fgm > team2Stats.fgm ? 'orange' : undefined}
          >
            {team1Stats.fgm}/{team1Stats.fga}
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
            c={team2Stats.fgm > team1Stats.fgm ? 'orange' : undefined}
          >
            {team2Stats.fgm}/{team2Stats.fga}
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.fgp > team2Stats.fgp ? 'orange' : undefined}
          >
            {team1Stats.fgp}%
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            FG%
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team2Stats.fgp > team1Stats.fgp ? 'orange' : undefined}
          >
            {team2Stats.fgp}%
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.three_m > team2Stats.three_m ? 'orange' : undefined}
          >
            {team1Stats.three_m}/{team1Stats.three_m}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            3pt
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team2Stats.three_m > team1Stats.three_m ? 'orange' : undefined}
          >
            {team2Stats.three_m}/{team2Stats.three_m}
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.fgm > team2Stats.fgm ? 'orange' : undefined}
          >
            {team1Stats.ftm}/{team1Stats.fta}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            FT
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team2Stats.fgm > team1Stats.fgm ? 'orange' : undefined}
          >
            {team2Stats.ftm}/{team2Stats.fta}
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.rb > team2Stats.rb ? 'orange' : undefined}
          >
            {team1Stats.rb}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            RB
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team2Stats.rb > team1Stats.rb ? 'orange' : undefined}
          >
            {team2Stats.rb}
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team1Stats.to < team2Stats.to ? 'orange' : undefined}
          >
            {team1Stats.to}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text c="dimmed" fz={20} fw={600} tt="uppercase">
            TO
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text
            lh={1}
            fz={36}
            lts={1.5}
            ff="mono45-headline"
            fw={700}
            c={team2Stats.to < team1Stats.to ? 'orange' : undefined}
          >
            {team2Stats.to}
          </Text>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}
