import { useState } from 'react';
import {
    Combobox,
    ComboboxProps,
    Input,
    InputBase,
    Loader,
    useCombobox,
} from '@mantine/core';
import axios from 'axios';

//TODO MAKE SEARCHABLE
async function getTeams() {
    try {
        const teams = await axios.get('../api/team');
        console.log(teams);
        return teams;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default function TeamSelect(props: ComboboxProps) {
    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
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

    const options = data.map((item) => (
        <Combobox.Option value={item.id} key={item.id}>
            {item.name}
        </Combobox.Option>
    ));

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
                >
                    {data.find(t => t.id === value)?.name ||
                        <Input.Placeholder>Pick team</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {loading ?
                        <Combobox.Empty>Loading....</Combobox.Empty> : options}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
