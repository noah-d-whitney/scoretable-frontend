import { Accordion, Badge, Box, Flex, Text } from '@mantine/core';
import PlayersMenu from '../components/PlayersMenu';

export default function GameAccordion() {
  return (
    <Accordion.Item value="1">
      <Accordion.Control>
        <Flex align="center" justify="space-between">
          <Box>
            <Text fw={700}>Team vs Team</Text>
            <Text c="gray">Waynesboro 3x3 Tournament</Text>
          </Box>
          <Text fw={500} lts={10} size="xl" c="gray">
            0-0
          </Text>
          <Badge mr={10} color="gray">
            Not started
          </Badge>
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        <Flex align="center" mt={5}>
          <Text mr={25}>Date: 05/11/23</Text>
          <PlayersMenu />
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
