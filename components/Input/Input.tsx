import { ComponentPropsWithRef, PropsWithChildren } from "react";
import styled from "../../theme/styled";
import Text, { Label, TextProps } from "../Text/Text";

export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type InputContainerProps = ComponentPropsWithRef<"div"> & {
  name?: string;
  label?: string;
  icon?: JSX.Element;
  required?: boolean;
  errors?: { [key: string]: string } | any;
  errorStyle?: object;
  helpText?: string;
  onClear?: () => void;
  style?: any;
  labelAndInputWrapperStyle?: any;
  textSize?: SizeType;
  touched?: { [key: string]: boolean } | any;
  // value?: any;
};

type StyledInputProps = ComponentPropsWithRef<"input"> & {
  inputSize?: SizeType;
};

export type InputComponentProps = ComponentPropsWithRef<"input"> &
  TextProps &
  InputContainerProps &
  StyledInputProps;

const StyledBaseComponent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: auto;
  /* width: 100%; */
  /* min-width: 100px; */
`;

const LabelAndInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Help = styled(Text)`
  margin-top: 0.25rem;
`;

const Error = styled(Text)`
  margin-top: -0.75em;
  margin-bottom: 1em;
  font-weight: 400;
  font-size: 0.75rem;
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function scrollToElementByNameSelector(selectorName) {
  // scroll to error field if it is the first error field
  const nameSelector = `[name='${selectorName}']`;
  // const idSelector = `[id='${selectorName}']`;
  const errorElement = document.querySelector(nameSelector) as HTMLElement;
  if (errorElement) {
    errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

const getError = ({ name, touched = {}, errors = {} }) => {
  // name attribute is not there or errors object is empty, do nothing.
  if (!name || !Object.values(errors).length) return;

  // first error key
  let errorKey = Object.keys(errors)[0];
  let error: any = null;

  // if name contains ".", it means keys are nested inside an object
  if (name.includes(".")) {
    const names = name.split(".");

    if (names.length === 1) {
      errorKey = names[names.length - 1];
      // so that only one error is displayed even though multiple errors are encountered.
      error = {
        [errorKey]: errors[names[0]],
      };
      scrollToElementByNameSelector(name);
      return error[errorKey];
    }

    if (names.length === 2) {
      errorKey = names[names.length - 1];
      error = {
        [errorKey]: errors[names[0]][names[1]],
      };
      scrollToElementByNameSelector(name);
      return error[errorKey];
    }

    if (names.length === 3) {
      errorKey = names[names.length - 1];
      error = {
        [errorKey]: errors[names[0]][names[1]][names[2]],
      };
      scrollToElementByNameSelector(name);
      return error[errorKey];
    }

    if (names.length === 4) {
      errorKey = names[names.length - 1];
      error = {
        [errorKey]: errors[names[0]][names[1]][names[2]][names[3]],
      };
      scrollToElementByNameSelector(name);
      return error[errorKey];
    }
  } else {
    if (typeof errors[errorKey] === "string") {
      // so that only one(i.e first error) error is displayed even though multiple errors are encountered.
      error = {
        [errorKey]: errors[errorKey],
      };
      scrollToElementByNameSelector(name);
      return error[name];
    }

    // key's value is object
    if (typeof errors[errorKey] === "object") {
      error = {
        [errorKey]: `${capitalizeFirstLetter(errorKey)} (${Object.keys(errors[errorKey]).join(
          ", ",
        )}) is required.`,
      };
      scrollToElementByNameSelector(name);
      return error[name];
    }
  }
};

export function InputContainer(props: PropsWithChildren<InputContainerProps>) {
  const {
    label,
    name = "",
    errors = {},
    touched = {},
    children,
    helpText,
    color,
    required,
    icon,
    textSize,

    labelAndInputWrapperStyle,
    errorStyle = {},
    ...wrapperProps
  } = props;

  return (
    <StyledBaseComponent {...wrapperProps}>
      <LabelAndInputWrapper style={{ ...labelAndInputWrapperStyle }}>
        {label && (
          <Label required={required} icon={icon} color={color} size={textSize}>
            {label}
          </Label>
        )}

        {children}
      </LabelAndInputWrapper>
      {!!Object.values(errors).length && (
        <Error textType="error" style={errorStyle}>
          {" "}
          {getError({ name, touched, errors })}
        </Error>
      )}
      {helpText && <Help textType="help"> {helpText}</Help>}
    </StyledBaseComponent>
  );
}

const inputSizes = {
  xs: "0.6rem;",
  sm: "0.8rem;",
  md: "1.3rem;",
  lg: "1.6rem;",
  xl: "2rem;",
  xxl: "2.2rem",
};

const fontSizes = {
  xs: "0.6rem;",
  sm: "0.8rem;",
  md: "1rem;",
  lg: "1.1rem;",
  xl: "1.2rem;",
  xxl: "1.3rem;",
};

const StyledInput = styled.input<StyledInputProps>`
  height: ${({ inputSize }) => (inputSize ? inputSizes[inputSize] : inputSizes.md)};
  font-size: ${({ inputSize }) => (inputSize ? fontSizes[inputSize] : inputSizes.md)};
  margin: 0.5rem 0px 1rem 0px;
  padding: 0.3rem 0.6rem;
  border: 1px solid rgba(180, 31, 31, 1);
  border-radius: 8px;
  font-family: "Poppins";
  font-weight: 200;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
  transition: border 0.2s, color 0.2s ease-in-out;

  ::placeholder {
    font-size: 0.8em;
  }

  /* :-webkit-autofill {
    -webkit-text-fill-color: #fff;
    box-shadow: 0 0 0px 1000px black inset;

    :focus {
      box-shadow: 0 0 0px 1000px red inset;
    }
  } */

  /* :hover {
    outline: 1px solid red;
  } */

  :focus {
    outline: 1px solid red;
  }
`;

function Input(props: InputComponentProps) {
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
    border: "1px solid red",
    borderRadius: "2px",
  };

  const inputProps = { ...rest, required, name }; // name attribute on input element is required for formik input and validation
  return (
    <InputContainer {...inputContainerProps}>
      <StyledInput
        style={{ ...(Object.keys(errors)[0] === name ? errorStyle : {}) }}
        {...inputProps}
      />
    </InputContainer>
  );
}

export default Input;
