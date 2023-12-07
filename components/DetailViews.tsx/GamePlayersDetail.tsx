import { Tabs, rem } from '@mantine/core';
import { IconStar, IconUser } from '@tabler/icons-react';
import StartersAssignmentView from './StartersAssignmentView';
import GamePlayersList from './GamePlayersList';
import { GameTeamsInterface } from '@/app/api/types';

export default function GamePlayersDetail(props: GameTeamsInterface) {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs color="orange" variant="outline" defaultValue="players">
      <Tabs.List>
        <Tabs.Tab size="lg" value="players" leftSection={<IconUser style={iconStyle} />}>
          Players
        </Tabs.Tab>
        <Tabs.Tab size="lg" value="starters" leftSection={<IconStar style={iconStyle} />}>
          Starters
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="players">
        <GamePlayersList team1={props.team1} team2={props.team2} />
      </Tabs.Panel>

      <Tabs.Panel value="starters">
        <StartersAssignmentView team1={props.team1} team2={props.team2} />
      </Tabs.Panel>
    </Tabs>
  );
}
