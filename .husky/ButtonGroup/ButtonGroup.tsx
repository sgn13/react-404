import { PropsWithChildren } from "react";
import styled from "../../src/theme_old/styled";

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
