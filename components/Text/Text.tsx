import { ComponentProps, PropsWithChildren, RefObject } from "react";
// using facade for styled-components.
import styled from "../../theme/styled";

export type TextSizeType = "xs" | "sm" | "md" | "lg" | "xl";

export type TextProps = ComponentProps<"span"> & {
  size?: TextSizeType;
  textType?: "title" | "label" | "error" | "help";
  color?: string;
  icon?: JSX.Element;
  className?: string;
  required?: boolean;
  dropdown?: boolean;
} & { ref?: RefObject<HTMLSpanElement> };

const labelStyles = {
  title: "font-weight: 400;",
  label: "font-weight: 400; color: #404b7c;",
  help: "font-style: italic;color:gray;",
  error: "font-style: italic;color:red;",
};

const textSizes = {
  xs: "0.8rem;",
  sm: "1rem;",
  md: "1.2rem;",
  lg: "1.5rem;",
  xl: "2rem;",
};

const StyledText = styled.span<TextProps>`
  font-size: ${({ size }) => (size ? textSizes[size] : textSizes.md)};

  color: ${({ color = "black" }) => color};

  ${({ icon }) =>
    icon &&
    `
    display: flex;
    align-items: center;
    text-align:left;
    svg {
      margin-right: 0.3rem;
    }
  `}
  ${({ textType = "title" }) => (textType ? `${labelStyles[textType]}` : null)};
  ${({ dropdown }) => (dropdown ? "display:flex; align-items:center;" : null)}

  width:fit-content;
  font-family: "Poppins";
  font-weight: 400;
`;

const Asterisk = styled.span`
  margin-right: 0.1rem;
`;

const Dropdown = styled.div`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid;
  margin-left: 0.5rem;
`;

// Here we're annotating the components propTypes as well as returnType.
function Text({
  className,
  children,
  required,
  icon,
  color,
  dropdown,
  ...rest
}: PropsWithChildren<TextProps>): JSX.Element {
  return (
    <StyledText {...rest} icon={icon} color={color} dropdown={dropdown} className={className}>
      {required && <Asterisk>*</Asterisk>}
      {icon}
      {children}
      {dropdown && <Dropdown />}
    </StyledText>
  );
}

export const Label = styled(Text).attrs({
  textType: "label",
})``;

export default Text;

// or
// Here we're annotating the type of value the variable (i.e Text, which refering to an anonymous function) holds.
// Here Text is of type Function component, which takes in TextProps as its parameter.
// Here we're not explictly annotating the type of the return value of the function.
// const Text: FC<PropsWithChildren<TextProps>> = ({
//   className,
//   children,
//   ...rest
// }) => {
//   return (
//     <span {...rest} className={className}>
//       {children}
//     </span>
//   );
// };
