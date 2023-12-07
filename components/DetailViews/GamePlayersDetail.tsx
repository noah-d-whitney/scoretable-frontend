import { Tabs, rem } from '@mantine/core';
import { IconStar, IconUser } from '@tabler/icons-react';
import StartersAssignmentView from './StartersAssignmentView';
import GamePlayersList from './GamePlayersList';
import { TeamGameDetails } from '@/app/api/types';

export default function GamePlayersDetail({ teams }: { teams: TeamGameDetails }) {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs color="orange" variant="outline" defaultValue="players">
      <Tabs.List>
        <Tabs.Tab value="players" leftSection={<IconUser style={iconStyle} />}>
          Players
        </Tabs.Tab>
        <Tabs.Tab value="starters" leftSection={<IconStar style={iconStyle} />}>
          Starters
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="players">
        <GamePlayersList teams={teams} />
      </Tabs.Panel>

      <Tabs.Panel value="starters">
        <StartersAssignmentView teams={teams} />
      </Tabs.Panel>
    </Tabs>
  );
}
