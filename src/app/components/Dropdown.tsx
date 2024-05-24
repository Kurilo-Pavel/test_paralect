import {MultiSelect} from '@mantine/core';
import React, {useState} from "react";
import {useAppDispatch} from "@/app/store/hooks";
import {setGenres} from "@/app/store/movie/movieSlice";

type DropdownProps = {
  label: string;
  dataOptions: string[];
  placeholder: string;
  minWidth: string;
  labelPadding: string;
  defaultValue:string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  setSort?: (value: string[]) => void;
}
const Dropdown = (
    {
      label,
      dataOptions,
      placeholder,
      minWidth,
      labelPadding,
      onChange,
      defaultValue
    }:
      DropdownProps
  ) => {
const dispatch = useAppDispatch();
    const [select, setSelect] = useState(false);

    const handleClick = (e:any) => {
      if (onChange) {
        onChange(e);
        dispatch(setGenres(e));
      }
    };
    return (
      <MultiSelect
        label={label}
        placeholder={defaultValue.length === 0 ? placeholder : ""}
        data={dataOptions}
        defaultValue={defaultValue}
        rightSection={select ? <img src="./arrow_up.svg" alt="open"/> : <img src="arrow_down.svg" alt="close"/>}
        styles={{
          root: {minWidth: minWidth},
          label: {paddingBottom: labelPadding, fontWeight: 700, letterSpacing: "0.3px"},
          pill: {background: "none"},
          dropdown: {borderRadius: "8px", background: "var(--white)", border: 0},
          input: {padding: "6px 10px", gap: "5px"},
          inputField: {letterSpacing: "-0.9px"},
          pillsList: {gap: "5px"},
          rightSection: {left: "-2px"}
        }}
        classNames={{
          pill: "myMultiSelectPill",
          input: "myMultiSelectInput",
          option: "myMultiSelectOption",
          pillsList: "myMultiSelectPillsList",
          section: "myMultiSelectSection",
        }}
        hiddenInputValuesDivider
        checkIconPosition="right"
        data-with-remove={true}
        radius="md"
        size="md"
        onChange={handleClick}
        withCheckIcon={false}
        maxDropdownHeight={200}
        onDropdownOpen={() => setSelect(true)}
        onDropdownClose={() => setSelect(false)}
      />
    )
  }
;
export default Dropdown;