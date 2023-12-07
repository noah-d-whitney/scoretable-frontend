import { Button, Flex, Grid, Title } from '@mantine/core';
import { useState } from 'react';
import { IconDeviceFloppy } from '@tabler/icons-react';
import StarterMultiSelect from '../Dropdowns/StarterMultiSelect';
import { GameTeamsInterface } from '@/app/api/types';

const players = [
  { name: 'Lebron James', number: 23, id: '1z6g' },
  { name: 'Stephen Curry', number: 16, id: '1e6s' },
  { name: 'James Harden', number: 54, id: '6hj4' },
  { name: 'Klay Thompson', number: 6, id: '8fks' },
  { name: 'Jeremy Grant', number: 12, id: '8iel' },
  { name: 'Shaquille ONeal', number: 28, id: 'isuk' },
  { name: 'Tyrese Haliburton', number: 33, id: '37su' },
];

export default function StartersAssignmentView(props: GameTeamsInterface) {
  const [selectedStarters, setSelectedStarters] = useState(
    props.team1.players.filter((p) => p.starter === true).map((p) => p.id)
  );
  const [selectedStarters2, setSelectedStarters2] = useState(
    props.team2.players.filter((p) => p.starter === true).map((p) => p.id)
  );
  const [isChanged, setIsChanged] = useState(false);

  function onChange() {
    setIsChanged(true);
  }
  return (
    <Flex direction="column" gap={20} my={20}>
      <Title order={3}>Assign Starters</Title>
      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <StarterMultiSelect
            players={props.team1.players}
            teamSize={3}
            teamLabel="Golden State Warriors"
            selected={selectedStarters}
            setSelected={setSelectedStarters}
            onChange={onChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <StarterMultiSelect
            players={props.team2.players}
            teamSize={3}
            teamLabel="Los Angeles Lakers"
            selected={selectedStarters2}
            setSelected={setSelectedStarters2}
            onChange={onChange}
          />
        </Grid.Col>
      </Grid>
      <Button
        onClick={() => setIsChanged(false)}
        color="orange"
        rightSection={<IconDeviceFloppy size={14} />}
        disabled={!isChanged}
        style={{ alignSelf: 'start' }}
      >
        Save
      </Button>
    </Flex>
  );
}
