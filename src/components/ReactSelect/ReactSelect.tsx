import { Box } from "@mui/material";
import { useState } from "react";
import Select from "react-select";

export default function ReactSelect({ onChange, selectedValue, options, keyname, ...rest }: any) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <Box>
      <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#f9fafb",
            primary: "#f9fafb",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "4px",
            cursor: "pointer",
            borderColor: state.isFocused ? "#555555" : "#BFC1C2",
            "&:hover": {
              border: "1px solid #D0D5DD",
            },
            paddingTop: 0.5,
            paddingBottom: 0.5,
            backgroundColor: "#f6f9fba2",
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#000000" : "#475467",
            // background: state.isSelected ? "#edeef0" : "#f9fafb",
            "&:hover": {
              backgroundColor: "#D0D5DD",
            },
          }),
        }}
        getOptionLabel={(e): any => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {e.Icon && <img src={e.Icon} alt="img" />}
            <span style={{ marginLeft: 5 }}>{e?.[keyname]}</span>
          </div>
        )}
        getOptionValue={(options: any) => options[keyname]}
        // for styling
        isRtl={isRtl}
        className="SelectResponseType"
        classNamePrefix="select"
        placeholder="Select Response Type"
        onChange={onChange}
        isDisabled={isDisabled}
        value={selectedValue}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name="SelectResponseType"
        options={options}
        {...rest}
      />
    </Box>
  );
}
