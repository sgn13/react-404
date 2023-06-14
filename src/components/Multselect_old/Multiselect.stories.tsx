// source: https://www.npmjs.com/package/multiselect-react-dropdown
import { storiesOf } from "@storybook/react";
import { MdArrowDropDown } from "react-icons/md";
import styled from "../../theme_old/styled";
import { Multiselect } from "./Multiselect";
import { objectOptions, stringOptions } from "./constants";

// customizing option hover style
const StyledMultiSelect = styled.div`
  .multiSelectContainer li:hover {
    background: #d2691e;
  }
  .checkbox {
    appearance: none;
    background-color: lightblue;
    width: 16px;
    height: 16px;
    border-radius: 2px;
  }
  .checkbox:checked {
    accent-color: #9d3039;
    appearance: auto;
  }
`;

storiesOf("Components/Multiselect", module)
  .add("1. Single Select [from string[]", () => (
    <Multiselect singleSelect options={stringOptions} isObject={false} showArrow />
  ))

  .add("2. Single pre-Selected", () => (
    <Multiselect
      singleSelect
      options={stringOptions}
      isObject={false}
      selectedValues={[stringOptions[0]]}
    />
  ))
  .add("3. Multi Select", () => <Multiselect options={stringOptions} isObject={false} />)
  .add("4. Multi pre-Selected", () => (
    <Multiselect
      options={stringOptions}
      isObject={false}
      selectedValues={[stringOptions[0], stringOptions[1]]}
    />
  ))
  .add("5. disabled pre-Selected", () => (
    <Multiselect
      options={stringOptions}
      isObject={false}
      selectedValues={[stringOptions[0], stringOptions[1]]}
      disablePreSelectedValues
    />
  ))
  .add("6. Options with checkbox", () => (
    <Multiselect options={stringOptions} isObject={false} showCheckbox />
  ))
  .add("7. Select limit", () => (
    <Multiselect options={stringOptions} isObject={false} selectionLimit={2} />
  ))
  .add("8. Custom Placeholder", () => (
    <Multiselect options={stringOptions} isObject={false} placeholder="Custom Placeholder" />
  ))
  .add("9. Single Select [from object[]] ", () => (
    <Multiselect singleSelect options={objectOptions} displayValue="key" />
  ))
  .add("10. Single pre-Selected", () => (
    <Multiselect
      singleSelect
      options={objectOptions}
      displayValue="key"
      selectedValues={[objectOptions[0]]}
    />
  ))
  .add("11. Multi Select", () => <Multiselect options={objectOptions} displayValue="key" />)
  .add("12. Multi pre-Selected", () => (
    <Multiselect
      options={objectOptions}
      displayValue="key"
      selectedValues={[objectOptions[0], objectOptions[1]]}
    />
  ))
  .add("13. Options Grouping", () => (
    <Multiselect options={objectOptions} displayValue="key" groupBy="cat" showCheckbox />
  ))
  .add("14. Custom Close Icon", () => (
    <Multiselect
      options={objectOptions}
      displayValue="key"
      selectedValues={[objectOptions[0], objectOptions[1]]}
      customCloseIcon={<>🍑</>}
    />
  ))
  .add("15. CssCustomization", () => (
    <StyledMultiSelect>
      <Multiselect
        id="css_custom"
        name="demo_options"
        options={objectOptions}
        displayValue="key"
        groupBy="cat"
        showCheckbox
        showArrow
        customArrow={<MdArrowDropDown size={24} style={{ color: "orange" }} />}
        style={{
          inputField: {
            color: "white",
            fontSize: "1.3rem",
          },
          chips: {
            background: "red",
            fontSize: "1.3rem",
          },
          searchBox: {
            border: "1px solid red",
            "border-radius": "10px",
          },
          multiselectContainer: {
            "border-radius": "10px",
            color: "red",
            maxWidth: "300px",
            backgroundColor: "gold",
          },
          groupHeading: {
            backgroundColor: "teal",
            color: "gold",
          },
          optionContainer: {
            backgroundColor: "purple",
          },
          option: {
            fontSize: "1.3rem",
            display: "flex",
            "align-items": "center",
            "border-bottom": "1px solid #d2691e",
          },
        }}
      />
    </StyledMultiSelect>
  ));
