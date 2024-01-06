import { useState } from 'react';
import {
    Alert,
    Button,
    Combobox,
    ComboboxProps,
    Flex,
    Input,
    InputBase,
    Loader,
    Text,
    useCombobox,
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';

interface FormInputProps {
    value: number | undefined,

    onChange(event: React.ChangeEvent<HTMLInputElement>): void;

    onFocus(event: React.FocusEvent<HTMLInputElement>): void;

    onBlur(event: React.FocusEvent<HTMLInputElement>): void;

    error: string;
}

//TODO MAKE SEARCHABLE
//TODO ADD TYPES

export default function TeamSelect(props: ComboboxProps & FormInputProps) {
    const {
        value,
        onChange: setValue,
    } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState<boolean>(false);

    async function getTeams() {
        try {
            const teams = await axios.get('../api/team');
            console.log(teams);
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
        },
        onDropdownOpen: () => {
            if (data.length === 0 && !loading) {
                setLoading(true);
                getTeams()
                    .then((response) => {
                        setData(response?.data);
                        setLoading(false);
                        combobox.resetSelectedOption();
                    });
            }
        },
    });

    const options = data.length > 0 ? data.map((item) => (
        <Combobox.Option value={item.id} key={item.id}>
            {item.name}
        </Combobox.Option>
    )) : <Flex direction="column" gap="sm" align="center" my="sm">
        <Text>No teams found</Text>
        <Button component={Link} href="../team/create" variant="default">Create
            one now
        </Button>
         </Flex>;

    return (
        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
                setValue(val);
                combobox.closeDropdown();
            }}
          {...props}
        >
            <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={loading ? <Loader size={18} color="orange" /> :
                        <Combobox.Chevron />}
                  onClick={() => combobox.toggleDropdown()}
                  rightSectionPointerEvents="none"
                  size={props.size}
                  radius={props.radius}
                  error={error}

                >
                    {data.find(t => t.id === value)?.name ||
                        <Input.Placeholder>Pick team</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                {error ?
                    <Alert color="red" m="sm" title="Error" radius="md">Something
                        went wrong
                        while getting
                        teams!
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
