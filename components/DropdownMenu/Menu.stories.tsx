import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import DropdownMenu from "./DropDown";
import menuItems from "./menu.json";

export const Item = styled.li`
  border-bottom: 1px solid #d8d8d8;
  list-style: none;
  margin: 0;

  &:last-child {
    border-bottom: none;
  }
`;

const Link = styled.a`
  display: flex;
  color: #4751a2;
  text-decoration: none;
  padding: 10px 5px;
  line-height: 1.3;

  &:hover {
    text-decoration: underline;
  }
`;

export const list = menuItems.map((item) => (
  <Item key={item.label}>
    <Link href={item.link}>
      {item.icon}
      {item.label}
    </Link>
  </Item>
));

storiesOf("Components/Menu", module).add("Demo", () => (
  <DropdownMenu list={list} open={true} offsetTop={15} closeOnOutsideClick>
    {({ toggle }) => <button onClick={toggle}>toggle</button>}
  </DropdownMenu>
));
