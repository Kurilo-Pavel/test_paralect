import {Select,Image} from '@mantine/core';
import React, {useState} from "react";
import {useAppDispatch} from "@/app/store/hooks";
import {setSort, setReleaseYear, setPage} from "@/app/store/movie/movieSlice";

type MySelectProps = {
  label: string,
  dataOptions: string[];
  minWidth: string;
  labelPadding: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const MySelect = (
  {
    label,
    dataOptions,
    placeholder,
    minWidth,
    labelPadding,
    type,
    defaultValue,
    onChange,
  }: MySelectProps) => {
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState(false);
  const handleClick = (e) => {
    if (type === "sort") {
      dispatch(setSort(e));
      dispatch(setPage(1));
    }
    if (type === "year" && onChange) {
      dispatch(setReleaseYear(e));
      onChange(e);
    }
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      data={dataOptions}
      allowDeselect={false}
      rightSection={select ? <Image src="./arrow_up.svg" alt="open"/> : <img src="arrow_down.svg" alt="close"/>}
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
};
export default MySelect;
