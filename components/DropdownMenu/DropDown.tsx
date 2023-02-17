import React, { useState } from "react";
import Toggleable from "./Toggleable";
import List from "./List";
import ClickOutside from "./ClickOutside";
import EscKeyPress from "./EscKeyPress";

function DropdownMenu({
  children,
  list,
  open = false,
  offsetTop = 20,
  closeOnOutsideClick,
}) {
  return (
    <Toggleable defaultOpen={open}>
      {({ open, toggle }) => {
        return (
          <ClickOutside
            closeOnOutsideClick={closeOnOutsideClick}
            onClickOutside={() => toggle(false)}
          >
            {({ containerRef }) => (
              <EscKeyPress onEscKeyPress={() => toggle(false)}>
                {() => {
                  return (
                    <List
                      list={list}
                      containerRef={containerRef}
                      open={open}
                      offsetTop={offsetTop}
                    >
                      {children({ toggle })}
                    </List>
                  );
                }}
              </EscKeyPress>
            )}
          </ClickOutside>
        );
      }}
    </Toggleable>
  );
}

export default DropdownMenu;
