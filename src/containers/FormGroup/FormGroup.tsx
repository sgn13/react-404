import React, { ComponentPropsWithRef, PropsWithChildren } from "react";
import styled from "../../theme_old/styled";

type WrapperProps = {
  width?: string;
  marginTop?: string;
  marginBottom?: string;
  paddingLeft?: string;
  paddingTop?: string;
  legendBorderColor?: string;
};

type GroupProps = ComponentPropsWithRef<"div"> &
  WrapperProps & {
    title: React.ReactNode;
    legendTextColor?: string;
  };

const Wrapper = styled.div<WrapperProps>`
  ${({
    width = "100%",
    marginBottom = "3rem",
    marginTop = "3rem",
    paddingLeft = "1.5rem",
    paddingTop = "3rem",
    legendBorderColor,
  }) => `
  padding: ${paddingTop} 1.5rem 1rem ${paddingLeft};
  border: 3px solid  ${legendBorderColor ?? "blue"};
  border-radius:4px;
  position: relative;
  margin-top: ${marginTop};
  margin-bottom: ${marginBottom};
  width: ${width};

  `}
`;

const Title = styled.div<{
  legendBorderColor?: string;
  legendTextColor?: string;
}>`
  display: block;
  position: absolute;
  top: -1.25rem;
  left: 1rem;
  background-color: #fff;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;
  border: 3px solid ${({ legendBorderColor }) => legendBorderColor ?? "blue"};
  color: ${({ legendTextColor }) => legendTextColor ?? "black"};
`;

const FormGroup = ({
  title,
  children,
  width,
  marginTop,
  marginBottom,
  paddingLeft,
  paddingTop,
  legendBorderColor = "gray",
  legendTextColor,
  ...rest
}: PropsWithChildren<GroupProps>) => {
  return (
    <Wrapper
      width={width}
      marginBottom={marginBottom}
      marginTop={marginTop}
      paddingLeft={paddingLeft}
      paddingTop={paddingTop}
      legendBorderColor={legendBorderColor}
      {...rest}
    >
      {title && (
        <Title
          legendBorderColor={legendBorderColor}
          legendTextColor={legendTextColor}
        >
          {title}
        </Title>
      )}
      {children}
    </Wrapper>
  );
};

export default FormGroup;
