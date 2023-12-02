import { Accordion, Paper, Title, useMantineColorScheme } from '@mantine/core';
import { Icon } from '@tabler/icons-react';

type DetailAccordionItem = {
  title: string;
  icon: Icon;
  content: JSX.Element;
};

export default function DetailsViewAccordion({ items }: { items: DetailAccordionItem[] }) {
  const { colorScheme } = useMantineColorScheme();

  function Items() {
    return items.map((item) => (
      <Paper
        component={Accordion.Item}
        value={item.title}
        withBorder
        shadow="md"
        bg={colorScheme === 'light' ? 'white' : 'dark.6'}
      >
        <Accordion.Control p={20} icon={<item.icon size={35} color="orange" />} h={100}>
          <Title order={3}>{item.title}</Title>
        </Accordion.Control>
        <Accordion.Panel px={20}>{item.content}</Accordion.Panel>
      </Paper>
    ));
  }
  return (
    <Accordion radius="md" chevronPosition="right" variant="separated">
      <Items />
    </Accordion>
  );
}
