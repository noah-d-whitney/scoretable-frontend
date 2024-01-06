'use client';

import { useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    CheckIcon,
    Combobox,
    ComboboxProps,
    Flex,
    Pill,
    PillsInput,
    Text,
    useCombobox,
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { UseFormReturnType } from '@mantine/form/lib/types';
import { PlayerSummaryDto } from '@/app/api/types';

interface FormInputProps {
    value: { name: string, id: string }[],
    form: UseFormReturnType<any>,
    error: string,
}

export default function PlayerMultiSelect(props: {
    inputProps: FormInputProps
} & ComboboxProps) {
    const {
        form,
        value: formValues,
        error: formError,
    } = props.inputProps;
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<PlayerSummaryDto[]>([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState<boolean>(false);

    async function getPlayers() {
        try {
            const teams = await axios.get<PlayerSummaryDto[]>('../api/player');
            setPlayers(teams.data);
            return teams;
        } catch (e: any) {
            console.log(e);
            setError(true);
            return [];
        }
    }

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            setError(false);
            setSearch('');
        },
        onDropdownOpen: async () => {
            if (players.length === 0 && !loading) {
                setLoading(true);
                await getPlayers();
                setLoading(false);
                combobox.resetSelectedOption();
            }
        },
        loop: false,
    });

    const handleValueSelect = (val: string) => {
        const player = formValues.find(p => p.id === val);

        if (player) {
            form.removeListItem('players', formValues.indexOf(player));
            return;
        }

        const playerToAdd = players.find(p => p.id === val);
        form.insertListItem('players', {
            name: `${playerToAdd?.firstName} ${playerToAdd?.lastName}`,
            id: val,
        });

        setSearch('');
    };

    const handleValueRemove = (val: string) => {
        const player = formValues.find(p => p.id === val);
        if (player) form.removeListItem('players', formValues.indexOf(player));
    };

    const selectedValues = formValues?.map((val) => (
        <Pill
          key={val.id}
          withRemoveButton
          onRemove={() => handleValueRemove(val.id)}
        >
            {val.name}
        </Pill>
    ));

    const options = players.length > 0
        ? players.filter((player) => (`${player.firstName} ${player.lastName}`).toLowerCase()
            .includes(search.trim()
                .toLowerCase()))
            .map((player) => (
                <Combobox.Option
                  value={player.id}
                  key={player.id}
                  active={!!formValues?.find(p => p.id === player.id)}
                >
                    <Flex gap="sm" align="center">
                        {formValues?.find(p => p.id === player.id)
                            ? <CheckIcon size={12} />
                            : null}
                        <Badge variant="light" color="orange">
                            {player.number}
                        </Badge>
                        {player.firstName} {player.lastName}
                    </Flex>
                </Combobox.Option>))
        : <Flex direction="column" gap="sm" align="center" my="sm">
            <Text>No players found</Text>
            <Button component={Link} href="../player/create" variant="default">
                Create one now
            </Button>
          </Flex>;

    return (
        <Combobox
          store={combobox}
          withinPortal={false}
          {...props}
          onOptionSubmit={handleValueSelect}
        >
            <Combobox.Target>
                <PillsInput
                  pointer
                  onClick={() => combobox.openDropdown()}
                  size={props.size}
                  radius={props.radius}
                  error={error}
                >
                    <Pill.Group>
                        {selectedValues}

                        <Combobox.EventsTarget withKeyboardNavigation={false}>
                            <PillsInput.Field
                              value={search}
                              placeholder="Search values"
                              onChange={(event) => {
                                    combobox.updateSelectedOptionIndex();
                                    setSearch(event.currentTarget.value);
                                }}
                              onFocus={() => combobox.openDropdown()}
                              onBlur={() => combobox.closeDropdown()}
                              onKeyDown={(event) => {
                                    if (event.key === 'Backspace' && search.length === 0) {
                                        event.preventDefault();
                                        form.removeListItem('players', formValues.length - 1);
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.Target>

            <Combobox.Dropdown mah={300} style={{ overflowY: 'scroll' }}>
                {error ?
                    <Alert color="red" m="sm" title="Error" radius="md">
                        Something went wrong while getting teams!
                    </Alert> :
                    <Combobox.Options>
                        {loading
                            ? <Combobox.Empty>Loading....</Combobox.Empty>
                            : options}
                    </Combobox.Options>
                }
            </Combobox.Dropdown>
        </Combobox>
    );
}
