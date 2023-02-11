import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import Sidebar from "containers/Sidebar/index";
// import NavBar from "containers/Navbar/";

import { AppState } from "store/reducer";

import { Loader } from "components/Spinner/Spinner";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import styled from "theme/styled";
import { IndexSidebar } from "constants/sidebar";
import Content from "./Content";

const AppBody = styled.div`
  font-size: 1rem;
  padding: 0.5em;
  height: 100vh;
  overflow-y: auto;
`;

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

          <div
            style={{
              flexGrow: 1,
              height: "100%",
              // marginRight: "1em",
            }}
          >
            {/* <NavBar /> */}
            <Content setActive={setActive} />
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
