import {
  Accordion,
  ActionIcon,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Text,
} from '@mantine/core';
import {
  IconCalendarEvent,
  IconClock,
  IconEyeFilled,
  IconPlayerPlayFilled,
  IconSettings,
} from '@tabler/icons-react';
import PlayersMenu from '../components/PlayersMenu';
import classes from './GameAccordion.module.css';

export default function GameAccordionCard({ testGameId }) {
  return (
    <Accordion.Item value={testGameId} className={classes.accordion}>
      <Accordion.Control className={classes.item}>
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
        <Flex align="center" mt={10}>
          <Badge mr={10} size="md" lts={3} bg="orange.4">
            3x3
          </Badge>
          <PlayersMenu />
          <Divider orientation="vertical" mx={15} size="xs" />
          <IconCalendarEvent
            height={25}
            stroke={1.75}
            style={{ color: 'var(--mantine-color-gray-5)', marginRight: 5 }}
          />
          <Text c="gray.7" fw={600} mr={20}>
            05/11/23
          </Text>
          <IconClock height={25} style={{ color: 'var(--mantine-color-gray-5)', marginRight: 5 }} />
          <Text c="gray.7" fw={600}>
            5:00PM
          </Text>
          <Divider orientation="vertical" mx={15} size="xs" />
          <Button disabled variant="default" color="orange">
            Stats
          </Button>
        </Flex>
        <Divider my={12} />
        <Flex align="center" gap={10}>
          <ButtonGroup>
            <Button variant="filled" color="green" leftSection={<IconPlayerPlayFilled size={14} />}>
              Start Game
            </Button>
            <Button variant="default" color="orange" leftSection={<IconEyeFilled size={14} />}>
              View Details
            </Button>
          </ButtonGroup>
          <ActionIcon variant="default" color="gray" aria-label="Settings" size="lg">
            <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
