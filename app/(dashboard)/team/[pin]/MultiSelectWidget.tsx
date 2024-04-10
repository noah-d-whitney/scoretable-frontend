import {
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    CloseButton,
    Combobox,
    Flex,
    Loader,
    Paper,
    Text,
    TextInput,
    useCombobox,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import { useFocusTrap } from '@mantine/hooks';
import usePlayers, { playerDto } from '@/hooks/usePlayers';

type SelectPlayerWidgetProps = {
    callbackFn: (pins: string[]) => any,
    loading: boolean,
    cancelFn: () => void,
    show: boolean,
};

export default function MultiSelectWidget(props: SelectPlayerWidgetProps) {
    const {
        callbackFn,
        cancelFn,
        loading,
        show,
    } = props;

    const combobox = useCombobox();
    const focusTrapRef = useFocusTrap(show);

    const [search, setSearch] = useState('');
    const [players, setPlayers] = useState<playerDto[]>([]);
    const [querying, setQuerying] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
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

    function handleClose() {
        setSearch('');
        setPlayers([]);
        setSelected([]);
        setSelectedPlayers([]);
        cancelFn();
    }

    const handleValueSelect = (val: string) => {
        const player = players.find(p => p.pin === val);
        setSelected((current) =>
            current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
        );
        setSelectedPlayers((current) =>
            current.some(p => p.pin === player!.pin)
                ? current.filter((p) => p.pin !== player!.pin)
                : [...current, player!]
        );
    };

    function getOptions(): ReactElement {
        const options = players
            .map((p) => (
                <Combobox.Option
                  value={p.pin}
                  key={p.pin}
                  active={selected.includes(p.pin)}
                  onMouseOver={() => combobox.resetSelectedOption()}
                >
                    <Flex justify="space-between" align="center">
                        <Flex gap="sm" align="center">
                            <Checkbox
                              checked={selected.includes(p.pin)}
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
            return <Flex
              align="center"
              justify="center"
              p="sm"
            >
                <Text c="gray.6">Please search for a player</Text>
                   </Flex>;
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

    const selectedRows = <Flex
      gap="sm"
      align="center"
      wrap="wrap"
      mt="xs"
      mb="md"
    >
        {selectedPlayers
            .map(p => <Paper radius="xl" p="xs" withBorder shadow="xs">
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
                         </Flex>;

    function render(): ReactElement {
        const card = (
            <Card withBorder shadow="sm" ref={focusTrapRef}>
                <Combobox
                  store={combobox}
                  onOptionSubmit={handleValueSelect}
                >
                    <Combobox.EventsTarget>
                        <TextInput
                          placeholder="Search players..."
                          value={search}
                          onChange={(event) => {
                                setSearch(event.currentTarget.value);
                                setQuerying(true);
                                combobox.updateSelectedOptionIndex();
                            }}
                          rightSection={querying ?
                                <Loader size="sm" /> : null}
                        />
                    </Combobox.EventsTarget>

                    <Combobox.Options my="sm">
                        {getOptions()}
                    </Combobox.Options>
                    <Combobox.Footer>
                        {selectedRows}
                        <Flex align="center" justify="center" gap="sm">
                            <Button
                                // TODO create handle submit func that waits
                                //  for loading then closes
                              onClick={() => {
                                    callbackFn(selected);
                                    handleClose();
                                }}
                              variant="light"
                              disabled={selected.length === 0}
                              loading={loading}
                            >Submit
                            </Button>
                            <Button
                              variant="default"
                              onClick={handleClose}
                            >Cancel
                            </Button>
                        </Flex>
                    </Combobox.Footer>
                </Combobox>
            </Card>);

        if (!show) return <></>;

        return card;
    }

    return render();
}
