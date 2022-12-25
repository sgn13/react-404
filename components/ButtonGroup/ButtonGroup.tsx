import React, { PropsWithChildren, ComponentPropsWithRef } from "react";
import styled from "../../theme/styled";

const Group = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: fit-content;
  gap: 5px;
  justify-content: flex-end;
`;

function ButtonGroup({ children, ...rest }: PropsWithChildren<{ children; rest?: any }>) {
  return <Group {...rest}>{children}</Group>;
}

export default ButtonGroup;
