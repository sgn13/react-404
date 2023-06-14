import React, { useState } from 'react';
import Select from 'react-select';
import { Box } from '@mui/material';

export default function ReactSelect({ handleTypeSelect, selectedValue, options }: any) {
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
            primary25: '#f9fafb',
            primary: '#f9fafb',
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: '8px',
            cursor: 'pointer',
            borderColor: state.isFocused ? '#D0D5DD' : '#D0D5DD',
            '&:hover': {
              border: '1px solid #D0D5DD',
            },
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#000000' : '#475467',
            background: state.isSelected ? '#edeef0' : '#f9fafb',
          }),
        }}
        getOptionLabel={(e): any => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {e.Icon && <img src={e.Icon} alt="img" />}
            <span style={{ marginLeft: 5 }}>{e.label}</span>
          </div>
        )}
        // for styling
        isRtl={isRtl}
        className="SelectResponseType"
        classNamePrefix="select"
        placeholder="Select Response Type"
        onChange={handleTypeSelect}
        isDisabled={isDisabled}
        value={selectedValue}
        isLoading={isLoading}
        // clear the search items
        isClearable={isClearable}
        // searching through the options
        isSearchable={isSearchable}
        name="SelectResponseType"
        // select options
        options={options}
      />
    </Box>
  );
}
