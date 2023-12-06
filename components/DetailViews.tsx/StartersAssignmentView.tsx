import { Button, Flex, Grid, Switch, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { IconDeviceFloppy } from '@tabler/icons-react';
import StarterMultiSelect from '../Dropdowns/StarterMultiSelect';

const players = [
  { name: 'Lebron James', number: 23, id: '1z6g' },
  { name: 'Stephen Curry', number: 16, id: '1e6s' },
  { name: 'James Harden', number: 54, id: '6hj4' },
  { name: 'Klay Thompson', number: 6, id: '8fks' },
  { name: 'Jeremy Grant', number: 12, id: '8iel' },
  { name: 'Shaquille ONeal', number: 28, id: 'isuk' },
  { name: 'Tyrese Haliburton', number: 33, id: '37su' },
];

export default function StartersAssignmentView() {
  const [selectedStarters, setSelectedStarters] = useState([]);
  const [selectedStarters2, setSelectedStarters2] = useState([]);
  const [usePositions, setUsePositions] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  function onChange() {
    setIsChanged(true);
  }
  return (
    <Flex direction="column" gap={20} mt={20}>
      <Switch
        size="md"
        label="Use Starter Positions"
        color="orange"
        description="Enables starters to be assigned to a position"
        mb={10}
        checked={usePositions}
        onChange={() => setUsePositions(!usePositions)}
      />
      <Flex direction="column" gap={20} style={{ display: usePositions ? 'none' : 'flex' }}>
        <StarterMultiSelect
          players={players}
          teamSize={3}
          teamLabel="Golden State Warriors"
          selected={selectedStarters}
          setSelected={setSelectedStarters}
          onChange={onChange}
        />
        <StarterMultiSelect
          players={players}
          teamSize={3}
          teamLabel="Los Angeles Lakers"
          selected={selectedStarters2}
          setSelected={setSelectedStarters2}
          onChange={onChange}
        />
      </Flex>
      <Grid gutter={20} style={{ display: !usePositions ? 'none' : 'flex' }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={3}>Golden State Warriors</Title>
          <Flex align="center">
            <Text size="lg">1</Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>Todo</Grid.Col>
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
