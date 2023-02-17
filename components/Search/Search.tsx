import React, { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import { TfiSearch } from "react-icons/tfi";
import { MdClear } from "react-icons/md";

const SearchContainer = styled.div<{
  active?: boolean;
  focused?: boolean;
  height?: string;
  color?: string;
}>`
  position: relative;
  font-size: 1rem;
  width: ${({ active, height }) => (active ? "25rem" : "3.75rem")};
  height: ${({ height }) => height || "3.75rem"};
  background-color: ${({ color }) => color || "#f08742"};

  border-radius: 50px;
  transition: 0.5s;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: ${({ focused, color }) => (focused ? `0 0 5px ${color || "#f08742"}` : "none")};
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
`;

const SearchIcon = styled(TfiSearch)`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const InputContainer = styled.div`
  width: 75%;
  height: inherit;
  position: relative;
  left: 60px;
  box-sizing: border-box;
`;

const SearchInput = styled(Input)<{ height?: string; color?: string }>`
  font-family: "cursive";
  margin: 0px;
  padding: 1ch;
  border: ${({ color }) => `1.5px solid  ${color || "orange"}`};
  position: absolute;
  top: 0px;
  width: 100%;
  height: ${({ height }) => height || "3.75rem"};
  box-sizing: border-box;
  outline: none;
  font-size: 1em;
  border-radius: 0px;

  :focus {
    outline: none;
  }
`;

const ClearIcon = styled(MdClear)`
  position: absolute;
  right: -35px;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const handleEnterPress = (e, callback, searchValue) => {
  if (!searchValue) return;
  if (e.key === "Enter") {
    callback(searchValue);
  }
};

function Search({
  color = "#25af9f",
  iconColor = "white",
  initialHeight = "2.5rem",
  onEnter = (searchValue = "null") => {},
  onSearchClose = () => {},
  searchContainerStyle = {},
  ...rest
}) {
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleClear = () => {
    setValue("");
    if (!value) {
      onSearchClose();
      setActive(false);
    }
  };

  return (
    <SearchContainer
      active={active}
      focused={focused}
      height={initialHeight}
      color={color}
      style={searchContainerStyle}
    >
      <SearchIcon size={24} fill={iconColor} onClick={() => setActive((prev) => !prev)} />

      <InputContainer>
        <SearchInput
          type="text"
          value={value}
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          height={initialHeight}
          color={color}
          onKeyDown={(e: any) => handleEnterPress(e, onEnter, value)}
          onChange={handleChange}
          {...rest}
        />
        <ClearIcon size={20} fill={iconColor} onClick={handleClear} />
      </InputContainer>
    </SearchContainer>
  );
}

export default Search;
