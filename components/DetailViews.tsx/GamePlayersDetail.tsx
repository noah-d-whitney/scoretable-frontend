import { Tabs, rem } from '@mantine/core';
import { IconStar, IconUser } from '@tabler/icons-react';
import StartersAssignmentView from './StartersAssignmentView';
import GamePlayersList from './GamePlayersList';

export default function GamePlayersDetail() {
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
        <GamePlayersList />
      </Tabs.Panel>

      <Tabs.Panel value="starters">
        <StartersAssignmentView />
      </Tabs.Panel>
    </Tabs>
  );
}
