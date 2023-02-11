import React, { useEffect } from "react";
import { StyledBaseComponentType } from "components/BaseComponent/types";
import styled from "theme/styled";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "assets/logo.png";
import ExpandIcon from "containers/Sidebar/expand-icon.svg";
import { primary, secondary } from "theme";
import { StyledSidebarType } from "./types";
import BaseSidebarItem from "./SidebarItem";

type BaseSidebarType = React.ComponentProps<"div"> &
  StyledSidebarType &
  StyledBaseComponentType & { type?: any; ref?: any; me?: any };

const StyledSidebarWrapper = styled.div<{ collapsed?: boolean; mobile?: boolean }>`
  width: ${({ collapsed }) => (collapsed ? "56px" : "260px")};
  height: inherit;
  padding-left: 4px;
  padding-right: 4px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
  transition: 200ms ease-in-out;
  opacity: ${({ mobile }) => (mobile ? 0 : 1)};

  background: #f7f7f7;
  font-size: 1rem;
  line-height: 18px;

  color: #343434;
`;

const NavTop = styled.div`
  flex: 1;
  max-height: 70vh;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${primary};
    border-radius: 7px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${secondary};
  }
`;

export const LogoHolder = styled.figure`
  max-width: 180px;
  width: 100%;
  margin-left: 1em;
`;

const NavBottom = styled.div`
  position: absolute;
  left: 11px;
  bottom: 15px;
`;

// export const sidebarFilter = ({ item, permissions, me }) => {
//   let childrenPermission = false;

//   item.children &&
//     item.children.length &&
//     item.children.forEach((childItem) => {
//       if (checkPermission({ permissions, permission: childItem.permission })) {
//         childrenPermission = true;
//       }
//     });

//   const roleTest = item.role
//     ? me?.profile.is_staff || me?.profile.is_superuser
//       ? item.role === "superuser" || item.role === "user"
//       : item.role === "user"
//     : item;

//   // roleTest = item.role === 'admin' || item.role === 'user';

//   return (
//     (checkPermission({ permissions, permission: item.permission }) && roleTest) ||
//     (childrenPermission && roleTest) ||
//     item.visible
//   );
// };

function BaseSidebar(props: BaseSidebarType) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mobile, sidebarItems, collapsed, setCollapsed, active, setActive, me } = props;
  console.log("sidebars", sidebarItems);

  // navigation and refresh fix
  useEffect(() => {
    if (pathname && sidebarItems.length) {
      const sidebarItem = sidebarItems.find((sideItem) => sideItem.path === pathname);
      if (sidebarItem?.label) setActive(sidebarItem?.label);
    } else {
      // make first item of sidebar as active
      setActive(sidebarItems[0]?.label); // setting default selected sidebar item
      // navigate(sidebarItems[0]?.path); // setting respective path to render
    }
  }, [sidebarItems, active]);

  return (
    <StyledSidebarWrapper collapsed={collapsed} mobile={mobile}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          // marginLeft: collapsed ? '5px' : '10px',
        }}
      >
        <NavTop>
          <div
            style={{
              paddingTop: "1.75em",
              paddingBottom: "0.25em",
              position: "relative",
              display: "flex",
            }}
          >
            {!collapsed ? (
              <LogoHolder>
                <img src={Logo} alt="Logo" style={{ width: "inherit" }} />
              </LogoHolder>
            ) : null}
            <div
              role="button"
              tabIndex={0}
              style={{
                cursor: "pointer",
                marginLeft: 10,
                marginTop: 10,
                marginBottom: collapsed ? 10 : 0,
              }}
              onClick={() => setCollapsed(!collapsed)}
              onKeyDown={() => setCollapsed(!collapsed)}
            >
              <img src={ExpandIcon} alt="expand icon" style={{ width: "18px" }} />
            </div>
          </div>
          {sidebarItems
            // .filter((sidebarItem) =>
            //   sidebarFilter({ item: sidebarItem, permissions: me?.permissions || [], me }),
            // )
            .filter((sidebarItem) => sidebarItem.location === "top")
            .map((sidebarItem) => {
              return (
                <BaseSidebarItem
                  item={sidebarItem}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  active={active}
                  onClick={() => {
                    setActive(sidebarItem.label);
                    navigate(sidebarItem.path);
                  }}
                  setActive={setActive}
                />
              );
            })}
        </NavTop>
      </div>

      <NavBottom>
        {!collapsed ? <hr style={{ marginBottom: "10px", width: "85%" }} /> : null}
        {!collapsed ? (
          <div
            style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              marginLeft: "11px",
            }}
          >
            Account
          </div>
        ) : null}
        {!collapsed ? (
          <hr style={{ marginTop: "10px", marginBottom: "10px", width: "85%" }} />
        ) : null}
        {sidebarItems
          // .filter((sidebarItemBottom) =>
          //   sidebarFilter({ item: sidebarItemBottom, permissions: me?.permissions || [], me }),
          // )
          .filter((sidebarItemBottom) => sidebarItemBottom.location === "bottom")
          .map((sidebarItemBottom) => (
            <BaseSidebarItem
              item={sidebarItemBottom}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              active={active}
              onClick={() => {
                setActive(sidebarItemBottom.label);
                navigate(sidebarItemBottom.path);
              }}
              setActive={setActive}
            />
          ))}
      </NavBottom>
    </StyledSidebarWrapper>
  );
}

export default BaseSidebar;
