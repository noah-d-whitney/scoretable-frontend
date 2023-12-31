import { Button, Flex, Grid, Title } from '@mantine/core';
import { useState } from 'react';
import { IconDeviceFloppy } from '@tabler/icons-react';
import StarterMultiSelect from '../Dropdowns/StarterMultiSelect';
import { TeamGameDetails } from '@/app/api/types';

export default function StartersAssignmentView({ teams }: { teams: TeamGameDetails }) {
  const [selectedStarters, setSelectedStarters] = useState(
    teams.team1.players.filter((p) => p.starter === true).map((p) => p.id)
  );
  const [selectedStarters2, setSelectedStarters2] = useState(
    teams.team2.players.filter((p) => p.starter === true).map((p) => p.id)
  );
  const [isChanged, setIsChanged] = useState(false);

  function onChange() {
    setIsChanged(true);
  }
  return (
    <Flex direction="column" gap={20} mt={20}>
      <Title order={3}>Assign Starters</Title>
      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <StarterMultiSelect
            players={teams.team1.players}
            teamSize={3}
            teamLabel="Golden State Warriors"
            selected={selectedStarters}
            setSelected={setSelectedStarters}
            onChange={onChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <StarterMultiSelect
            players={teams.team2.players}
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
