import { Flex, MultiSelect, Switch } from '@mantine/core';
import StarterMultiSelect from '../Dropdowns/StarterMultiSelect';
import { useState } from 'react';

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
  function onChange() {
    console.log('TEST');
  }
  return (
    <Flex direction="column" align={{ base: 'center', sm: 'start' }} gap={20} mt={20}>
      <Switch
        size="md"
        label="Use Starter Positions"
        color="orange"
        description="Enables starters to be assigned to a position"
      />
      <StarterMultiSelect
        players={players}
        teamSize={3}
        teamLabel="Golden State Warriors"
        selected={selectedStarters}
        setSelected={setSelectedStarters}
        onChange={onChange}
      />
    </Flex>
  );
}
