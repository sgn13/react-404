import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: relative;
  font: 14px sans-serif;
`;

const MenuPosition = styled.div<{ offsetTop: number }>`
  position: absolute;
  top: ${(props) => props.offsetTop}px;
  left: 0;
  z-index: 1;
`;

const Wrapper = styled.ul`
  min-width: 150px;
  width: fit-content;
  padding: 0 10px;
  border-radius: 4px;
  background-color: #fff;
  border: solid 1px #ccc;
`;

const List = ({ children, containerRef, open, offsetTop, list }) => (
  <MenuContainer ref={containerRef}>
    {children}
    {children && open && (
      <MenuPosition offsetTop={offsetTop}>
        <Wrapper>{list}</Wrapper>
      </MenuPosition>
    )}
  </MenuContainer>
);

export default List;
