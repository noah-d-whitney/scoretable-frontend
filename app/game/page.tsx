import {
  Accordion,
  Autocomplete,
  Button,
  Card,
  Flex,
  Grid,
  Menu,
  MultiSelect,
  Text,
  rem,
} from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconCaretDownFilled,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import GameAccordion from './GameAccordionCard';

export default function Game() {
  return (
    <>
      <Flex gap={20} mb={20}>
        <Menu offset={0} position="bottom-start" shadow="md" width={200}>
          <Menu.Target>
            <Button color="orange" rightSection={<IconCaretDownFilled size={14} />}>
              Quick Actions
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
            >
              Messages
            </Menu.Item>
            <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Grid>
        <Grid.Col span={9}>
          <Card withBorder radius="md">
            <Card.Section p={10} withBorder>
              <Flex gap={5}>
                <Autocomplete
                  placeholder="Tournament"
                  data={['Test1', 'test2']}
                  label="Tournament"
                />
                <MultiSelect
                  data={['Not Started', 'In Progress', 'Finished']}
                  clearable
                  maxValues={3}
                  label="Filter Progress"
                />
              </Flex>
            </Card.Section>
            <Card.Section h="50%">
              <Accordion>
                <GameAccordion testGameId="1" />
                <GameAccordion testGameId="2" />
                <GameAccordion testGameId="3" />
                <GameAccordion testGameId="4" />
                <GameAccordion testGameId="5" />
                <GameAccordion testGameId="6" />
                <GameAccordion testGameId="7" />
              </Accordion>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
