'use client';

import React, { useState } from 'react';
import {
    Alert,
    Button,
    Combobox,
    Flex,
    InputBase,
    InputBaseProps,
    Loader,
    Text,
    useCombobox,
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { TeamSummaryDTO } from '@/app/api/types';

interface FormInputProps {
    error?: string;
    setValue: (value: string | undefined) => void;
}

export default function TeamSelect(props: {
    inputProps: FormInputProps
} & InputBaseProps) {
    const {
        error: formError,
        setValue,
    } = props.inputProps;
    const [loading, setLoading] = useState(false);
    const [teams, setTeams] = useState<TeamSummaryDTO[]>([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<null | string>(null);

    async function getTeams() {
        try {
            const fetchedTeams = await axios.get<TeamSummaryDTO[]>('../api/team');
            return fetchedTeams.data;
        } catch (e: any) {
            setError(true);
            return [];
        }
    }

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            setError(false);
        },
        onDropdownOpen: async () => {
            setValue(undefined);
            setSearch('');
            if (teams.length === 0 && !loading) {
                setLoading(true);
                await getTeams()
                    .then((t) => setTeams(t));
                setSelectedValue(null);
                setLoading(false);
                combobox.resetSelectedOption();
            }
        },
    });

    const options = (teams.length > 0
            ? teams
                .filter((team) => team.name.toLowerCase()
                    .includes(search.trim()
                        .toLowerCase()))
                .map((team) => (
                    <Combobox.Option
                      value={team.name}
                      key={team.id}
                      id={team.id}
                    >
                        {team.name}
                    </Combobox.Option>))
            : <Flex direction="column" gap="sm" align="center" my="sm">
                <Text>No teams found</Text>
                <Button
                  component={Link}
                  href="../team/create"
                  variant="default"
                >Create one now
                </Button>
              </Flex>
    );

    return (
        <>
            <Combobox
              store={combobox}
              withinPortal={false}
              shadow="md"
              onOptionSubmit={(value, optionProps) => {
                    setValue(optionProps.id!);
                    setSearch(value);
                    setSelectedValue(value);
                    combobox.closeDropdown();
                }}
              size={props.size}
              radius={props.radius}
            >
                <Combobox.Target>
                    <InputBase
                      value={search}
                      rightSection={loading ?
                            <Loader size={18} color="orange" /> :
                            <Combobox.Chevron />}
                      onClick={() => combobox.openDropdown()}
                      onChange={(event) => {
                            combobox.openDropdown();
                            combobox.updateSelectedOptionIndex();
                            setSearch(event.currentTarget.value);
                        }}
                      onFocus={() => combobox.openDropdown()}
                      onBlur={() => {
                            combobox.closeDropdown();
                            setSearch(selectedValue || '');
                        }}
                      rightSectionPointerEvents="none"
                      size={props.size}
                      radius={props.radius}
                      error={formError}
                      placeholder="Search Teams"
                      {...props}
                    />
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
        </>
    );
}
