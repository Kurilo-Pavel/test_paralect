import {NumberInput} from '@mantine/core';
import React from "react";
import {useAppDispatch} from "@/app/store/hooks";
import {setRatingFrom, setRatingTo} from "@/app/store/movie/movieSlice";

type MyNumberInputProps = {
  label?: string;
  placeholder: string;
  type: string;
  defaultValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const MyNumberInput = (
  {
    onChange,
    onFocus,
    onBlur,
    type,
    defaultValue,
    error,
    label,
    placeholder
  }: MyNumberInputProps) => {
  const dispatch = useAppDispatch();
  const handleClick = (e:number|string|React.ChangeEvent<HTMLInputElement>) => {
    onChange(e as React.ChangeEvent<HTMLInputElement>);
    if (type === "from") {
      dispatch(setRatingFrom(Number(e)));
    }
    if (type === "to") {
      dispatch(setRatingTo(Number(e)));
    }
  };
  return (
    <NumberInput
      radius="md"
      error={error}
      styles={{
        label: {paddingBottom: "8px", fontWeight: 700, letterSpacing: "0.4px"},
        input: {paddingLeft: "10px", paddingBlock: "10px", letterSpacing: "-0.2px"},
        section: {paddingRight: "6px"},
        control: {border: "none"}, wrapper: {marginBottom: 0}, error: {position: "absolute"}
      }}
      onChange={handleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      label={label}
      placeholder={placeholder}
      size="md"
      defaultValue={defaultValue}
    />
  );
};
export default MyNumberInput;