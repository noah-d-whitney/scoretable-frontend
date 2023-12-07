import { IconBallBasketball, IconUser } from '@tabler/icons-react';
import { Flex, Tabs } from '@mantine/core';
import ButtonStatsDetail from '../Buttons/ButtonStatsDetail';
import { TeamGameDetails } from '@/app/api/types';
import TablePlayerStatsSimple from '../Tables/TablePlayerStatsSimple';
import GameStatsView from './GameStatsView';

export default function GameStatsDetail({ teams }: { teams: TeamGameDetails }) {
  return (
    <>
      <Flex mb={15}>
        <ButtonStatsDetail />
      </Flex>
      <Tabs variant="outline" defaultValue="game">
        <Tabs.List mb="lg">
          <Tabs.Tab value="game" leftSection={<IconBallBasketball size={12} />}>
            Game
          </Tabs.Tab>
          <Tabs.Tab value="player" leftSection={<IconUser size={12} />}>
            Player
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="game">
          <GameStatsView teams={teams} />
        </Tabs.Panel>
        <Tabs.Panel value="player">
          <TablePlayerStatsSimple teams={teams} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
