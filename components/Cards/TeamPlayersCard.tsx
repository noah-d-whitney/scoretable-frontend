import { Avatar, Badge, Card, Flex, List, Title } from '@mantine/core';

// TODO Add props interface
// TODO Add Empty state
// TODO Add Multi State
function PlayerListItem() {
    // TODO make links
    return <List.Item
      icon={<Avatar
        src={null}
        alt="Vitaly Rtishchev"
        color="orange"
        size="sm"
      >
            23
            </Avatar>}
    >
        Carmelo Anthony
           </List.Item>;
}

export default function TeamPlayersCard() {
    return <Card
      shadow="sm"
      padding="md"
      withBorder
      radius="md"
    >
        <Card.Section inheritPadding withBorder py="lg">
            <Flex
              justify="space-between"
              direction="column"
              gap={10}
            >
                <Badge color="orange">Team 1</Badge>
                <Title order={3}>
                    Golden State Warriors
                </Title>
            </Flex>
        </Card.Section>
        <Flex
          component={List}
          type="unordered"
          listStyleType="none"
          gap={25}
          wrap="wrap"
          mt="md"

        >
            <PlayerListItem />
            <PlayerListItem />
            <PlayerListItem />
            <PlayerListItem />
            <PlayerListItem />
            <PlayerListItem />
            <PlayerListItem />
        </Flex>
           </Card>;
}
