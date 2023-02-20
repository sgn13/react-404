import React from "react";
import { InputContainer, InputContainerProps } from "../Input/Input";
import { Multiselect } from "../Multselect/Multiselect";

function Select(props: any) {
  const {
    label,
    name = "",
    errors = {},
    touched = {},
    helpText,
    children,
    color = "#3c3a3a",
    required,
    icon,
    textSize,

    labelAndInputWrapperStyle,
    ...rest
  } = props;

  const inputContainerProps: InputContainerProps = {
    label,
    name,
    errors,
    children,
    helpText,
    color,
    required,
    icon,
    textSize,
    touched,
    labelAndInputWrapperStyle,
  };

  const errorStyle = {
    searchBox: {
      "border-color": "red",
    },
  };

  const inputProps = { ...rest, required, name }; // name attribute on input element is required for formik input and validation
  let { style, ...restInputProps } = inputProps;
  style =
    Object.keys(errors)[0] === name
      ? { ...style, ...errorStyle }
      : {
          ...style,
        };

  return (
    <InputContainer {...inputContainerProps}>
      <Multiselect style={{ ...style }} {...restInputProps} />
    </InputContainer>
  );
}

export default Select;
