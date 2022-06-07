import webpackLogo from "assets/images/webpack-logo.png";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { backgroundColor, textColor } from "theme";
import { connect, ConnectedProps } from "react-redux";
import { toggleLightDarkTheme, setTheme } from "store/theme/actions";
import { AppState } from "store/reducer";

const Container = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
  transition: all 0.5s ease;
`;

// eslint-disable-next-line @typescript-eslint/no-shadow
function Welcome({ themeName, toggleLightDarkTheme, setTheme }: React.FC<PropsFromRedux>) {
  return (
    <Container>
      <h1>Welcome Webpack Development Server.</h1>
      <img src={webpackLogo} alt="webpack-logo" style={{ width: 300, height: "auto" }} />
      <img
        src="/images/typescript-logo.png"
        alt="webpack-logo"
        style={{ width: 300, height: "auto" }}
      />
      <p>
        <input type="checkbox" checked={themeName === "dark"} onChange={toggleLightDarkTheme} />
        <span>Use Dark Theme</span>
      </p>
      <button type="button" onClick={() => setTheme("brand")}>
        change to brand theme
      </button>
    </Container>
  );
}

const mapStateToProps = ({ themeState: { themeName } }: AppState) => ({
  themeName,
});

const mapDispatchToProps = {
  toggleLightDarkTheme,
  setTheme,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Welcome);
