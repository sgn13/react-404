import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import Sidebar from "containers/Sidebar/index";
// import NavBar from "containers/Navbar/";

import { AppState } from "store/reducer";

import { Loader } from "components/Spinner/Spinner";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import styled from "theme/styled";

const AppBody = styled.div`
  font-size: 1rem;
  padding: 0.5em;
  height: 100vh;
  overflow-y: auto;
`;

const Content = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - 8em);
  overflow: auto;
  background: rgba(4, 103, 160, 0.01);
  box-sizing: border-box;
`;

// const ContentBody = styled.main`
//   margin-top: 1em;
//   width: 100%;

//   background: rgba(4, 103, 160, 0.01);

//   ${theme.mixin.scrollbar({ size: '1em', foregroundColor: 'slategray' })};
// `;

export const Page = styled.div``;

function Layout({ children, sidebar, me, isLoading }) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AppBody>
        <div style={{ display: "flex", height: "100%", gap: "1em" }}>
          {sessionStorage.getItem("accessToken") ? (
            <div
              style={{
                flexBasis: "fit-content",
                overflowY: "auto",
                height: "100%",
                minHeight: 750,
                boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.25)",
                borderRadius: "1em",
                minWidth: "fit-content",
              }}
            >
              <Sidebar
                sidebarItems={sidebar}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                active={active}
                setActive={setActive}
              />
            </div>
          ) : null}

          <div
            style={{
              flexGrow: 1,
              height: "100%",
              // marginRight: "1em",
            }}
          >
            <Content>{children}</Content>
            {/* <NavBar /> */}
          </div>
        </div>
      </AppBody>
    </>
  );
}

const mapStateToProps = ({ appState: { sidebar, me, notification, isLoading } }: AppState) => ({
  sidebar,
  me,
  notification,
  isLoading,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Layout);
