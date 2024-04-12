import usePlayers, { playerDto } from "@/hooks/usePlayers";
import { ActionIcon, Avatar, Badge, Card, Checkbox, InputWrapper, LoadingOverlay, Table, Text, Tooltip } from "@mantine/core";
import { IconPlus, IconSwitch, IconX } from "@tabler/icons-react";
import { ReactElement, useEffect, useState } from "react";

type TeamPlayersLineupInputProps = {
    value?: string[]
    onChange?: (value: string[]) => void
    playerPins: string[]
}

export default function TeamPlayersLineupInput({ value, playerPins, onChange }: TeamPlayersLineupInputProps) {
    const { getPlayer, loading } = usePlayers();

    const [plInactive, setPlInactive] = useState<playerDto[]>([]);
    const [plActive, setPlActive] = useState<playerDto[]>([]);
    const [swapEls, setSwapEls] = useState<playerDto[]>([]);

    useEffect(() => {
        const plList: playerDto[] = []
        playerPins.forEach(p => {
            if (!plActive.some(e => e.pin === p)) {
                getPlayer(p)
                    .then(res => plList.push(res))
            }
        })
        setPlInactive(plList);
    }, [playerPins])

    useEffect(() => {
        if (swapEls.length === 2) {
            const pls = plActive;

            const player1Idx = pls.findIndex(p => p.pin === swapEls[0].pin);
            const player2Idx = pls.findIndex(p => p.pin === swapEls[1].pin);
            const player1 = pls[player1Idx];
            const player2 = pls[player2Idx];
            pls[player1Idx] = player2;
            pls[player2Idx] = player1;

            setSwapEls([]);
            setPlActive(pls);
            onChange!(pls.map(p => p.pin));
        }
    }, [swapEls]);

    function toggleSwapEl(pl: playerDto) {
        setSwapEls((cur) => cur.includes(pl) ? cur.filter(p => p.pin !== pl.pin) : [...cur, pl]);
    }

    function handleAddToLineup(pl: playerDto) {
        setPlInactive((cur) => cur.filter(p => p.pin !== pl.pin));
        setPlActive((cur) => [...cur, pl])

        onChange!([...value!, pl.pin]);
    }

    function handleRemoveFromLineup(pl: playerDto) {
        setPlActive((cur) => cur.filter(p => p.pin !== pl.pin));
        setPlInactive((cur) => [...cur, pl])

        onChange!(value!.filter(p => p !== pl.pin));
    }

    function generateTable(active: playerDto[], inactive: playerDto[]): ReactElement {
        const activePlayerRows = active.map((p, i) =>
            <Table.Tr key={p.pin}>
                <Table.Td width={30}>
                    <Text
                        size="lg"
                        fw={700}
                    >{i + 1}
                    </Text>
                </Table.Td>
                <Table.Td
                    width={50}
                >
                    <Avatar
                        size="md"
                    >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                    </Avatar>
                </Table.Td>
                <Table.Td
                    width={45}
                >
                    <Badge
                        variant="light"
                        color="orange"
                    >
                        {p.pref_number}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Text size="md">
                        {`${p.first_name} ${p.last_name}`}
                    </Text>
                </Table.Td>
                <Table.Td width={50}>
                    <Checkbox
                        size="md"
                        checked={swapEls.includes(p)}
                        onChange={() => toggleSwapEl(p)}
                        icon={IconSwitch}
                        variant="outline"
                    />
                    <Tooltip label="Don't add to lineup">
                        <ActionIcon size="sm" variant="transparent" onClick={() => handleRemoveFromLineup(p)}>
                            <IconX size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Table.Td>
            </Table.Tr>
        )

        const inactivePlayerRows = inactive.map(p =>
            <Table.Tr key={p.pin}>
                <Table.Td width={30}>
                </Table.Td>
                <Table.Td
                    width={50}
                    opacity={0.5}
                >
                    <Avatar
                        size="md"
                    >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                    </Avatar>
                </Table.Td>
                <Table.Td
                    width={45}
                    opacity={0.5}
                >
                    <Badge
                        variant="light"
                        color="orange"
                    >
                        {p.pref_number}
                    </Badge>
                </Table.Td>
                <Table.Td opacity={0.5}>
                    <Text size="md">
                        {`${p.first_name} ${p.last_name}`}
                    </Text>
                </Table.Td>
                <Table.Td width={50}>
                    <Tooltip label="Add to lineup">
                        <ActionIcon onClick={() => handleAddToLineup(p)} size="sm" variant="transparent">
                            <IconPlus size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Table.Td>
            </Table.Tr>
        );

        if (activePlayerRows.length + inactivePlayerRows.length === 0) {
            return <Card>
                No Players
            </Card>;
        }

        return (
            <Table
                verticalSpacing="sm"
            >
                <Table.Tbody>
                    {activePlayerRows}
                    {inactivePlayerRows}
                </Table.Tbody>
            </Table>);
    }

    return (
        <Card
            withBorder
            radius="md"
            px="lg"
            py="xs"
        >
            <LoadingOverlay
                visible={false}
                zIndex={1000}
                overlayProps={{
                    radius: 'sm',
                    blur: 2,
                }}
            />
            <InputWrapper label="Player Lineup" size="lg">
                {generateTable(plActive, plInactive)}
            </InputWrapper>
        </Card>
    );

}
