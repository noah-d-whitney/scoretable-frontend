import { Divider, Flex, Tabs, rem } from '@mantine/core';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import ButtonStatsDetail from '../Buttons/ButtonStatsDetail';
import StartersAssignmentView from './StartersAssignmentView';

export default function GamePlayersDetail() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <>
      <Flex>
        <ButtonStatsDetail />
      </Flex>
      <Divider mt={10} mb={10} />
      <Tabs color="orange" variant="outline" defaultValue="gallery">
        <Tabs.List justify="center">
          <Tabs.Tab value="players" leftSection={<IconPhoto style={iconStyle} />}>
            Players
          </Tabs.Tab>
          <Tabs.Tab value="lineups" leftSection={<IconMessageCircle style={iconStyle} />}>
            Lineups
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="players">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="lineups">
          <StartersAssignmentView />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
