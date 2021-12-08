import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectWithSearch = ({
  name,
  options,
  id,
  instanceId,
  handleChange,
  label,
}) => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Select
        options={options}
        styles={customStyles}
        theme={theme}
        id={id}
        instanceId={instanceId}
        onChange={(e) => handleChange(e)}
        name={name}
      />
      {label ? (
        <label className="text-xs text-white" htmlFor={id}>
          {label}
        </label>
      ) : null}
    </>
  );
};

export default SelectWithSearch;

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#023950",
    borderColor: state.isFocused ? "#60A5FA" : "#9CA3AF",
    color: "#fff",
    "&:hover": {
      borderColor: state.isFocused ? "#60A5FA" : "#9CA3AF",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    background: "#023950",
    marginTop: 0,
    color: "#fff",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
};

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#4B5563",
    primary: "#2d2828",
  },
});
