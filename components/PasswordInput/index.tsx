import React, { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import See from "./see.svg";
import styled from "theme/styled";
import Input, { InputComponentProps } from "components/Input/Input";
import { Label } from "components/Text/Text";

type BaseInputType = React.ComponentProps<"input"> & { ref?: any };

const BaseInput = styled.input<BaseInputType>`
  font-size: ${({ inputSize = "md" }) =>
    inputSize === "lg" ? 1.2 : inputSize === "md" ? 1 : 0.7}rem;
  height: ${({ inputSize = "md" }) => (inputSize === "lg" ? 50 : inputSize === "md" ? 40 : 20)}px;

  padding: ${({ inputIcon }) => `1rem 1rem 1rem ${inputIcon ? "3" : ".3"}rem;`};

  position: relative;
  width: 100%;
  font-family: "Poppins";

  transition: border, color 0.2s ease-in-out;
  background-color: white;

  border: 1px solid
    ${({ errors, value, required }) => (errors && !value && required ? "red" : "gray")};

  border-radius: 4px;

  :-webkit-autofill {
    -webkit-text-fill-color: #fff;
    box-shadow: 0 0 0px 1000px black inset;

    :focus {
      box-shadow: 0 0 0px 1000px red inset;
    }
  }

  ::placeholder {
    color: gray;
    font-weight: 400;
    font-size: 0.8rem;
    left: 24px;
    font-family: "Poppins";
    font-style: normal;
  }

  :hover {
    border: 1px solid red;
  }

  :focus {
    outline: 0;
    border: 1px solid red;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
`;

const PasswordEyeWrapper = styled.div`
  position: absolute;
  right: 1em;
  top: 1.5rem;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const ForgotPassword = styled.p`
  color: purple;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 0.8rem;
  margin-left: auto;
  /* margin-top: -0.65rem; */
  text-align: right;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const PasswordInput = ({
  label,
  showForgotPassword = true,
  ...rest
}: InputComponentProps & {
  showForgotPassword?: boolean;
}) => {
  const [typeIsPassword, setTypeIsPassword] = useState(true);

  return (
    <>
      <Label>{label}</Label>
      <PasswordInputWrapper>
        <Input type={typeIsPassword ? "password" : "text"} {...rest} />
        <PasswordEyeWrapper onClick={() => setTypeIsPassword((prev) => !prev)}>
          {typeIsPassword ? <FaEyeSlash fill="gray" /> : <FaEye fill="gray" />}
        </PasswordEyeWrapper>
        {showForgotPassword && <ForgotPassword>Forgot Password?</ForgotPassword>}
      </PasswordInputWrapper>
    </>
  );
};

export default PasswordInput;
