import React from "react";
import useDelayUnmount from "src/hooks/useDelayUnmount/useDelayUnmount";
import styled from "../../theme_old/styled";

const Container = styled.div`
  @keyframes inAnimation {
    0% {
      opacity: 0;
      max-height: 0px;
    }
    100% {
      opacity: 1;
      max-height: 600px;
    }
  }

  @keyframes outAnimation {
    0% {
      opacity: 1;
      max-height: 600px;
    }
    100% {
      opacity: 0;
      max-height: 0px;
    }
  }
`;

function ShowWithAnimation({
  children,
  isMounted,
}: {
  children: React.ReactNode;
  isMounted: boolean;
}) {
  const showDiv = useDelayUnmount(isMounted, 450);
  const mountedStyle = { animation: "inAnimation 450ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 470ms ease-out",
    animationFillMode: "forwards",
  };
  return (
    <Container>
      {showDiv && <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>}
    </Container>
  );
}

export default ShowWithAnimation;
