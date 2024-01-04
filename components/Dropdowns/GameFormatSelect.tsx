import { Select, SelectProps } from '@mantine/core';

const GameFormatOptions = [
    {
        value: '1',
        label: '1V1',
    },
    {
        value: '2',
        label: '2V2',
    },
    {
        value: '3',
        label: '3V3',
    },
    {
        value: '4',
        label: '4V4',
    },
    {
        value: '5',
        label: '5V5',
    },
];

interface FormInputProps {
    value: number | undefined,

    onChange(event: React.ChangeEvent<HTMLInputElement>): void;

    onFocus(event: React.FocusEvent<HTMLInputElement>): void;

    onBlur(event: React.FocusEvent<HTMLInputElement>): void;

    error: string;
}

export default function GameFormatSelect(props: FormInputProps & SelectProps) {
    return <Select
      data={GameFormatOptions}
      {...props}
    />;
}
