import {
    ActionIcon,
    Avatar,
    Badge,
    Card,
    Checkbox,
    CloseButton,
    Combobox,
    Flex,
    InputWrapper,
    Loader,
    Paper,
    Text,
    TextInput,
    useCombobox,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import usePlayers, { playerDto } from '@/hooks/usePlayers';
import { IconX } from '@tabler/icons-react';

type SelectPlayerWidgetProps = {
    value?: string[]
    onChange?: (value: string[]) => void
};

export default function TeamPlayersMultiSelect(props: SelectPlayerWidgetProps) {
    const {
        value,
        onChange,
    } = props;

    const combobox = useCombobox();

    const [search, setSearch] = useState('');
    const [players, setPlayers] = useState<playerDto[]>([]);
    const [querying, setQuerying] = useState(false);
    const [selectedPlayers, setSelectedPlayers] = useState<playerDto[]>([]);
    const { getPlayers } = usePlayers();

    useEffect(() => {
        if (search.length === 0) {
            setQuerying(false);
            return () => {
            };
        }
        const timeout = setTimeout(() => {
            getPlayers({
                name: search,
                pageSize: 5,
            })
                .then(res => {
                    setPlayers(res.players);
                });
            setQuerying(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    const handleValueSelect = (val: string) => {
        if (onChange != null) {
            onChange(value?.includes(val) ? value.filter((v) => v !== val) : [...value!, val]);
        }

        const player = players.find(p => p.pin === val);
        setSelectedPlayers((current) =>
            current.some(p => p.pin === val)
                ? current.filter((p) => p.pin !== val)
                : [...current, player!]
        );
    };

    function getOptions(
        fetchedPlayers: playerDto[],
        selectedPlayers: playerDto[],
        search: string,
        querying: boolean): ReactElement {
        const options = fetchedPlayers
            .map((p) => (
                <Combobox.Option
                    mb="xs"
                    value={p.pin}
                    key={p.pin}
                    active={selectedPlayers.some(pl => pl.pin === p.pin)}
                    onMouseOver={() => combobox.resetSelectedOption()}
                >
                    <Flex justify="space-between" align="center">
                        <Flex gap="sm" align="center">
                            <Checkbox
                                checked={selectedPlayers.some(pl => pl.pin === p.pin)}
                                onChange={() => {
                                }}
                                aria-hidden
                                style={{ pointerEvents: 'none' }}
                            />
                            <Avatar
                                size="sm"
                            >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                            </Avatar>
                            <Text>{p.first_name} {p.last_name}</Text>
                        </Flex>
                        <Flex align="center" gap="sm">
                            <Badge variant="default">#{p.pref_number}</Badge>
                            <Badge variant="light">{p.pin}</Badge>
                        </Flex>
                    </Flex>
                </Combobox.Option>
            ));

        if (search === '' || querying) {
            return <></>;
        }

        if (options.length === 0 && search.length > 0) {
            return <Flex
                align="center"
                justify="center"
                p="sm"
            >
                <Text c="gray.6">No players found
                    for &quot;{search}&quot;
                </Text>
            </Flex>;
        }

        return <>{options}</>;
    }

    function getSelectedPlayers(selectedPlayers: playerDto[]): ReactElement {
        if (selectedPlayers.length === 0) {
            return <Flex
                align="center"
                justify="center"
                pt="sm"
            >
                <Text c="gray.6">No players selected...</Text>
            </Flex>;
        }

        return (<Flex
            gap="sm"
            align="center"
            wrap="wrap"
            pt="sm"
        >
            {selectedPlayers
                .map(p => <Paper radius="xl" p="xs" withBorder shadow="xs" key={p.pin}>
                    <Flex gap="sm" align="center">
                        <Avatar
                            size="sm"
                        >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                        </Avatar>
                        <span>{p.first_name} {p.last_name}</span>
                        <CloseButton
                            size="xs"
                            radius="xl"
                            onClick={() => handleValueSelect(p.pin)}
                        />
                    </Flex>
                </Paper>)
            }
        </Flex>);
    }

    function render(): ReactElement {
        const card = (
            <InputWrapper size='lg' label='Players' description='Optionally assign players to team. Can be done at a later time.'>
                <Card withBorder mb={0} mt="sm">
                    <Combobox
                        store={combobox}
                        onOptionSubmit={handleValueSelect}
                    >
                        <Combobox.EventsTarget>
                            <TextInput
                                mb="sm"
                                placeholder="Search players..."
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.currentTarget.value);
                                    setQuerying(true);
                                    combobox.updateSelectedOptionIndex();
                                }}
                                rightSection={querying
                                    ? <Loader size="sm" />
                                    : <ActionIcon variant='transparent' onClick={() => setSearch('')} size='sm'>
                                        <IconX size={16} />
                                    </ActionIcon>}
                            />
                        </Combobox.EventsTarget>

                        <Combobox.Options>
                            {getOptions(players, selectedPlayers, search, querying)}
                        </Combobox.Options>
                        <Combobox.Footer>
                            {getSelectedPlayers(selectedPlayers)}
                        </Combobox.Footer>
                    </Combobox>
                </Card>
            </InputWrapper>
        );

        return card;
    }

    return render();
}
