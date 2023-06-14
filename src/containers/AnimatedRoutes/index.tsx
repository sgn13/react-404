import { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import styled from "src/theme_old/styled";

export const AnimationStyles = styled.div`
  .fadeIn {
    animation: 0.3s fadeIn forwards;
  }

  .fadeOut {
    animation: 0.3s fadeOut forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-20px, 0);
    }
    to {
      opacity: 1;
      transform: translate(0px, 0px);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(0px, 0px);
    }
    to {
      transform: translate(-20px, 0);
      opacity: 0;
    }
  }
`;

// usage:
// import routes from "./routes";
// <AnimatedRoutes routes={routes}/>
function AnimatedRoutes({ routes }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  const appRouters = useRoutes(routes, displayLocation);

  return (
    <AnimationStyles>
      <div
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
        className={transitionStage}
      >
        {appRouters}
      </div>
    </AnimationStyles>
  );
}

export default AnimatedRoutes;
