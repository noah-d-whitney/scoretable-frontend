import {
  Accordion,
  Autocomplete,
  Card,
  Flex,
  Grid,
  MultiSelect,
  SimpleGrid,
  Skeleton,
  rem,
} from '@mantine/core';
import GameAccordion from './GameAccordion';

const PRIMARY_COL_HEIGHT = rem(300);

export default function Game() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <Card withBorder radius="md">
        <Card.Section p={10} withBorder>
          <Flex gap={5}>
            <Autocomplete placeholder="Tournament" data={['Test1', 'test2']} label="Tournament" />
            <MultiSelect
              data={['Not Started', 'In Progress', 'Finished']}
              clearable
              maxValues={3}
              label="Filter Progress"
            />
          </Flex>
        </Card.Section>
        <Card.Section>
          <Accordion>
            <GameAccordion />
            <GameAccordion />
            <GameAccordion />
            <GameAccordion />
          </Accordion>
        </Card.Section>
      </Card>
      <Grid gutter="md">
        <Grid.Col>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
      </Grid>
    </SimpleGrid>
  );
}
