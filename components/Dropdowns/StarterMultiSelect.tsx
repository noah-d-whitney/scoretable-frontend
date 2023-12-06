import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  Text,
  useCombobox,
} from '@mantine/core';

interface StartersMultiSelectProps {
  players: { name: string; number: number; id: string }[];
  teamSize: number;
  selected: string[];
  setSelected: (value: any) => void;
  onChange: () => void;
  teamLabel: string;
}

export default function StarterMultiSelect(props: StartersMultiSelectProps) {
  const { players, teamSize, selected, setSelected, onChange, teamLabel } = props;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    setSelected((current: typeof selected) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );
    onChange();
  };

  const handleValueRemove = (val: string) => {
    setSelected((current: typeof selected) => current.filter((v) => v !== val));
    onChange();
  };

  const values = selected.map((id) => (
    <Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
      {players.find((p) => p.id === id)?.name}
    </Pill>
  ));

  const options = players.map((player) => (
    <Combobox.Option
      value={player.id}
      key={player.id}
      active={selected.includes(player.id)}
      disabled={selected.length >= teamSize && !selected.includes(player.id)}
    >
      <Group gap="sm">
        {selected.includes(player.id) ? <CheckIcon size={12} /> : null}
        <Text c="gray.5">{player.number}</Text>
        <span>{player.name}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false} size="md">
      <Combobox.DropdownTarget>
        <PillsInput
          pointer
          onClick={() => combobox.toggleDropdown()}
          size="lg"
          style={{ width: '100%' }}
          label={teamLabel}
        >
          <Pill.Group>
            {values.length > 0 ? (
              values
            ) : (
              <Input.Placeholder>Select {teamSize} starters</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                    handleValueRemove(selected[selected.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Header>
          {selected.length}/{teamSize} starters selected
        </Combobox.Header>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
