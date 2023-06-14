import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { StyledSidebarItemType } from "./types";

type BaseSidebarItemType = React.ComponentProps<"a"> & StyledSidebarItemType & { ref?: any };

const NavItemContents = styled.div<{ collapsed }>`
  display: flex;
  width: ${({ collapsed }) => (collapsed ? `2rem` : "14rem;")};
  height: 2rem;
  align-items: center;
`;

const Label = styled.span`
  display: flex;
  flex: 1;
  overflow: hidden;
  font-size: 0.875rem;
  transition: 200ms;
  margin-left: 1rem;
`;

const NavigationMenuItem = styled.div<{ isOpen; active; collapsed; item }>`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  cursor: pointer;

  flex-direction: column;
  align-items: center;
  padding-left: ${({ collapsed }) => (collapsed ? "7px" : "10px")};
  border: none;
  border-radius: 6px;
  outline: none;
  transition: 300ms;
  text-decoration: none;
  font-family: "Poppins";
  font-weight: 400;
  color: ${({ active, item }) => (active === item.label ? "#cd171f" : "inherit")};

  ${({ active, item }) =>
    active === item.label
      ? `
      background-color: #80808011;
      filter: saturate(1.2);
      font-weight:500;
    `
      : null}

  &:hover {
    background-color: #80808011;
    color: #cd171f;
    filter: saturate(1.2);

    ${({ collapsed, item }) =>
      collapsed &&
      item.label &&
      `::after {
          content: '${item.label || ""}';
          left:56px;
          font-size:15px;
          padding:4px;
          border-radius:4px;
          opacity:0.9;
          transition:0.5s;
          background:teal;
          color:white;
          z-index:1000;
          transition: all 0.5s ease;
          position: absolute;
          pointer-events:none;
        }
    `}
  }
`;

function BaseSidebarItem(props: BaseSidebarItemType) {
  const navigate = useNavigate();
  const { collapsed, setCollapsed, active, item, setActive } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavigationMenuItem {...props} isOpen={isOpen}>
        <NavItemContents collapsed={collapsed} onClick={() => setIsOpen((prev) => !prev)}>
          {item.icon}
          {item.label && !collapsed && <Label>{item.label}</Label>}
          {!!(item.children && item.children.length) && (
            <> {isOpen ? <FaChevronDown /> : <FaChevronLeft />}</>
          )}
        </NavItemContents>
      </NavigationMenuItem>
      {isOpen &&
        !!(item.children && item.children.length) &&
        item.children.map((childItem, i) => (
          <div key={i} style={{ marginLeft: !collapsed && "2rem" }}>
            <BaseSidebarItem
              item={childItem}
              collapsed={collapsed}
              active={active}
              onClick={() => {
                setActive(childItem.path);
                navigate(childItem.path);
              }}
              setActive={setActive}
            />
          </div>
        ))}
    </>
  );
}

export default BaseSidebarItem;
