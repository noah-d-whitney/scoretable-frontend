import { Accordion, Paper, Title, useMantineColorScheme } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';

export default function DetailsViewAccordion() {
  const { colorScheme } = useMantineColorScheme();
  function Item() {
    return (
      <Paper
        component={Accordion.Item}
        value="reset-password"
        withBorder
        shadow="md"
        bg={colorScheme === 'light' ? 'white' : 'dark.6'}
      >
        <Accordion.Control p={20} icon={<IconChartBar size={35} color="orange" />} h={100}>
          <Title order={3}>Game Stats</Title>
        </Accordion.Control>
        <Accordion.Panel>Hi</Accordion.Panel>
      </Paper>
    );
  }
  return (
    <Accordion radius="md" chevronPosition="right" variant="separated">
      <Item />
    </Accordion>
  );
}
