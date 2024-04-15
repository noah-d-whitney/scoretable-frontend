import usePlayers, { playerDto } from "@/hooks/usePlayers"
import { Avatar, Card, Checkbox, InputWrapper, NumberInput, Table, Text } from "@mantine/core"
import { ReactElement, useEffect, useRef, useState } from "react"

type TeamPlayersNumbersInputProps = {
    value?: Map<string, number>
    onChange?: (val: Map<string, number>) => void
    playerPins: string[]
}

export default function TeamPlayersNumbersInput({ value, onChange, playerPins }: TeamPlayersNumbersInputProps) {
    const { getPlayersList } = usePlayers();
    const [players, setPlayers] = useState<playerDto[]>([]);
    const [visible, setVisible] = useState(false);
    const numbers = useRef(new Map<string, number>);

    useEffect(() => {
        if (playerPins.length > 0) {
            getPlayersList(playerPins)
                .then(res => {
                    setPlayers(res);
                    res.forEach(p => {
                        numbers.current.set(p.pin, p.pref_number!);
                    })
                });
        }
    }, [playerPins]);

    function handleChange(pin: string, value: number): void {
        numbers.current = numbers.current.set(pin, value);
        onChange!(numbers.current);
    }

    function getTable(pls: playerDto[]): ReactElement {
        const rows = pls?.map(p =>
            <Table.Tr key={p.pin}>
                <Table.Td width={50}>
                    <Avatar
                        size="md"
                    >{p.first_name.slice(0, 1) + p.last_name.slice(0, 1)}
                    </Avatar>
                </Table.Td>
                <Table.Td>
                    <Text size="md">
                        {`${p.first_name} ${p.last_name}`}
                    </Text>
                </Table.Td>
                <Table.Td width={100}>
                    <NumberInput
                        radius="md"
                        size="md"
                        onChange={(v) => handleChange(p.pin, Number(v))}
                        defaultValue={p.pref_number!}
                        max={99}
                        min={0}
                    />
                </Table.Td>
            </Table.Tr>);

        return (
            <Table verticalSpacing="xs">
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>);
    }

    function show(s: boolean): ReactElement {
        if (!s) return <></>;

        return (
            <InputWrapper size="lg" mt="sm">
                <Card
                    withBorder
                    radius="md"
                    px="lg"
                    py="xs"
                >
                    {getTable(players)}
                </Card>
            </InputWrapper>
        );
    }

    return (
        <>
            <Checkbox
                label="Assign Player Numbers?"
                description="Optionally assign team player numbers on creation. This action can be performed later."
                size="lg"
                checked={visible && playerPins.length > 0}
                disabled={playerPins.length === 0}
                onChange={() => setVisible(!visible)}
            />
            {show(visible && playerPins.length > 0)}
        </>
    );
}

