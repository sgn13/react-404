import webpackLogo from "assets/images/webpack-logo.png";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ConnectedProps, connect } from "react-redux";
import { setTheme, toggleLightDarkTheme } from "store/theme/actions";
import { AppState } from "store/reducer";
import { ThemeContext } from "containers/ReactThemeProvider/ReactThemeProvider";
import { getTheme } from "theme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.primary.default};
  color: #000;
  transition: all 0.5s ease;
  transition-property: color background-color;
`;

const StyledButton = styled.button`
  background-color: #fff;
  color: #000;
  transition: all 0.5s ease;
  transition-property: color background-color transform;

  :hover {
    color: white;
    background-color: blue;
    transform: scale(1.1);
  }
`;

const Parent = styled.div`
  width: 300px;
  height: 300px;
  background-color: black;
  /* :hover .child {
    transform: translateX(100%);
  } */
  :hover .child {
    animation-play-state: paused;
  }
`;

const Child = styled.div`
  height: 50%;
  width: 50%;
  background-color: red;
  /* transition: transform 0.7s; */
  animation: slide-left-to-right 1s ease-in-out infinite alternate;
  @keyframes slide-left-to-right {
    0% {
      transform: translateX(0);
    }
    33% {
      transform: translateY(100%);
    }
    66% {
      transform: translateX(100%) translateY(100%);
    }
    100% {
      transform: translateX(100%);
      background-color: green;
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-shadow
function Welcome({ theme, toggleLightDarkTheme, setTheme }: React.FC<PropsFromRedux>) {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("/posts").then((response) => {
  //     console.log("got response", response);
  //     setData(response.data);
  //   });
  // }, []);

  // console.log({ theme });

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
        <input
          type="checkbox"
          checked={theme?.themeName === "dark"}
          onChange={toggleLightDarkTheme}
        />
        <span>Use Dark Theme</span>
      </p>
      {/* <StyledButton type="button" onClick={() => {})}>
        change to brand theme
      </StyledButton> */}
      {/* <Parent>
        <Child className="child" />
      </Parent> */}
    </Container>
  );
}

const mapStateToProps = ({ themeState: { theme } }: AppState) => ({
  theme,
});

const mapDispatchToProps = {
  toggleLightDarkTheme,
  setTheme,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Welcome);
