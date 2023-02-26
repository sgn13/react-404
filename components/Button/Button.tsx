import React, { PropsWithChildren, ComponentPropsWithRef } from "react";
import styled from "styled-components";
import Text, { TextProps } from "../Text/Text";
import shadows from "../../constants/css/shadows";
import { InputContainerProps } from "../Input/Input";

type SizeType = "xs" | "sm" | "md" | "lg" | "xl";

type StyledButtonProps = ComponentPropsWithRef<"button"> & {
  icon?: React.ReactNode;
  backgroundColorOnHover?: string;
  shadow?: string;
  linesOnHover?: boolean;
  backgroundColor?: string;
  borderColorOnHover?: string;
};

export type ButtonComponentProps = ComponentPropsWithRef<"button"> &
  TextProps & {
    dropdown?: any;
    textStyle?: any;
    noRipple?: boolean;
    noTextShadow?: boolean;
    elevation?: number;
    icon?: JSX.Element;
    size?: SizeType;
  } & StyledButtonProps &
  InputContainerProps;

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: flex;
  align-items: center;

  /* overflow: hidden; */

  ${({ backgroundColor }) =>
    backgroundColor ? `background-color:${backgroundColor};` : "background-color:#0c6628;"}

  background-clip: padding-box;

  padding: 0.5rem 1rem;

  outline: 0;
  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;

  user-select: none;
  white-space: nowrap;
  box-shadow: ${({ shadow }) => shadow};

  cursor: pointer;
  transition: 300ms ease-out;
  transition-property: background-color, filter, box-shadow;

  :hover {
    box-shadow: ${({ shadow }) => (shadow ? "none" : " 0 0 0.5rem rgba(0, 0, 0, 0.3);")};
    border-color: ${({ borderColorOnHover }) =>
      borderColorOnHover ? `${borderColorOnHover};` : "rgba(0, 0, 0, 0.3);"};

    ${({ backgroundColorOnHover }) =>
      backgroundColorOnHover
        ? `background-color:${backgroundColorOnHover};`
        : ` filter: saturate(1.4);`}
  }
  /* :focus {
    outline: 1px solid;
    outline-color: lightblue;
  } */

  :active {
    filter: saturate(2);
  }

  ${(disabled) =>
    disabled &&
    `:disabled {
      filter: grayscale(1);
      cursor: not-allowed;
    }
  `}

  ${({ linesOnHover, backgroundColor }) =>
    linesOnHover
      ? `
  :before,
  :after {
    border: 0 solid transparent;
    transition: all 0.25s;
    content: "";
    height: 24px;
    position: absolute;
    width: 24px;
  }
  :before {
    border-top: 2px solid ${backgroundColor || "#CD171F"};
    left: 0px;
    top: -5px;
  }
  :after {
    border-bottom: 2px solid ${backgroundColor || "#CD171F"};
    bottom: -5px;
    right: 0px;
  }
  :hover:before,
  :hover:after {
    height: 100%;
    width: 100%;
  }
  `
      : null}

  span.ripple {
    position: absolute; /* The absolute position we mentioned earlier */
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms ease-in;
    background-color: rgba(254, 254, 254, 0.2);
  }

  @keyframes ripple {
    to {
      transform: scale(3);
      opacity: 0;
    }
  }
`;

const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
};

const handleClick = ({
  event,
  onClick,
  disabled,
  noRipple,
}: {
  event: React.MouseEvent<HTMLButtonElement>;
  onClick: any;
  disabled: boolean;
  noRipple: boolean;
}) => {
  if (!noRipple) createRipple(event);

  // executing user onClick handler
  !disabled && onClick();
};

const StyledText = styled(Text)<{ noTextShadow: boolean }>`
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  text-shadow: ${({ noTextShadow }) => (!noTextShadow ? "0 -1px rgb(0 0 0 / 69%)" : "none")};
`;

function Button(props: PropsWithChildren<ButtonComponentProps>) {
  const {
    children,
    size,
    onClick = () => {},
    disabled = false,
    icon,
    color = "white",
    dropdown,
    textStyle = {},
    noRipple = false,
    elevation = 0,
    noTextShadow = false,
    type = "button",
    iconRight,
    ...rest
  } = props;

  return (
    <StyledButton
      type={type}
      onClick={(event: any) => {
        handleClick({ event, onClick, disabled, noRipple });
      }}
      disabled={disabled}
      shadow={shadows[elevation]}
      {...rest}
    >
      <StyledText
        size={size}
        color={color}
        icon={icon}
        iconRight={iconRight}
        style={textStyle}
        noTextShadow={noTextShadow}
        dropdown={dropdown}
      >
        {children}
      </StyledText>
    </StyledButton>
  );
}

export default Button;
