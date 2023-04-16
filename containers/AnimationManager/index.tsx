import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "theme/styled";

const AnimationStyles = styled.div`
  .slideLeft {
    animation: 0.3s cubic-bezier(0.01, 0.47, 0.42, 1.05) slideLeft;
  }

  @keyframes slideLeft {
    0% {
      opacity: 0;
      transform: translateX(35px);
    }

    40% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .slideRight {
    animation: 0.3s cubic-bezier(0.01, 0.47, 0.42, 1.05) slideRight;
  }

  @keyframes slideRight {
    0% {
      opacity: 0;
      transform: translateX(-35px);
    }

    40% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .slideUp {
    animation: 0.4s cubic-bezier(0, 0.38, 0.31, 1.12) slideUp;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(35px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .slideDown {
    animation: 0.4s cubic-bezier(0, 0.38, 0.31, 1.12) slideDown;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-35px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

function AnimatedChildren({ children, animationName = "slideRight" }) {
  const location = useLocation();
  const [newLocation, setNewLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState(animationName);

  useEffect(() => {
    if (location.pathname !== newLocation.pathname) setTransistionStage(animationName);
  }, [location, newLocation]);

  return (
    <AnimationStyles>
      <div
        onAnimationEnd={() => {
          if (transitionStage === animationName) {
            setTransistionStage("");
            setNewLocation(location);
          }
        }}
        className={transitionStage}
      >
        {children}
      </div>
    </AnimationStyles>
  );
}

export default AnimatedChildren;
