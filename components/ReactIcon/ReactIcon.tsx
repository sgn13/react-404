import styled from "styled-components";

const ReactIcon = styled.div<{ color?: string; hoverColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: gray;
  border-radius: 50%;
  padding: 1px;

  svg {
    color: ${({ color }) => color ?? "black"};
  }
  svg:hover {
    color: ${({ hoverColor }) => hoverColor ?? "red"};
  }
`;

export default ReactIcon;
