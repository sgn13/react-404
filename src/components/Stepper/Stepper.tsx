import { Fragment, ReactNode } from "react";

// import shadows from "constants/css/shadows";
import { IoIosCheckmarkCircle } from "react-icons/io";
import shadows from "src/constants/css/shadows";
import styled from "styled-components";

const textColor = "#143467d9";
const lineColor = "#1434678f";
const circleColor = "#204176";
// const iconColor = 'rgb(19, 198, 70)';
const iconColor = circleColor;

const breakpoints = {
  xxxs: "360px",
  xxs: "420px",
  xs: "520px",
  sm: "620px",
  md: "760px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px",
};

const Steps = styled.div`
  font-size: 1rem;
  display: flex;

  flex-direction: column;
  width: fit-content;
  margin: 0 auto;

  /* border: 1px solid #9a9a9a67; */
  border-bottom: none;
  box-shadow: ${shadows[1]};
  padding: 1em 7em;
  padding-left: 1em;
  border-radius: 4px;

  @keyframes inAnimation {
    0% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }

  @keyframes outAnimation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    padding: 2em;
    padding-top: 5em;
    flex-shrink: 0;
    overflow-x: auto;
  }
`;

const Step = styled.div`
  position: relative;
  width: fit-content; // equal to the width of each step instead of based on instrinsic width: ;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.p`
  position: absolute;
  top: 0.8em;
  left: 50px;
  font-family: "Lato";
  font-size: 0.9em;
  white-space: nowrap;
  color: ${textColor};
  @media screen and (min-width: ${breakpoints.md}) {
    top: -50px;
    left: 0px;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    font-size: 1em;
  }
`;

const Circle = styled.div<{ checked?: boolean; isNext?: boolean }>`
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? iconColor : circleColor)};
  background-color: ${({ isNext }) => (isNext ? circleColor : "#f5f5f5;")};

  transition: border 0.7s cubic-bezier(0.2, 0.11, 0.28, 0.99);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div<{ checked?: boolean }>`
  position: relative;
  background-color: ${lineColor};
  width: 3px;
  height: 100%;
  min-height: 2em;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.md}) {
    height: 3px;
    min-height: auto;
    width: 100%;
    min-width: 3em;
    margin: auto 0;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ checked }) => (checked ? "100%;" : "0px")};
    content: "";
    z-index: 1;
    background-color: ${iconColor};
    transition: width 0.7s cubic-bezier(0.2, 0.11, 0.28, 0.99);
  }
`;

const Number = styled.span<{ isNext?: boolean }>`
  color: ${({ isNext }) => (isNext ? "#f5f5f5;" : "#000;")};
`;
const CheckIcon = styled(IoIosCheckmarkCircle)`
  color: ${iconColor};
`;

const mountedStyle = { animation: "inAnimation 250ms ease-in" };
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards",
};

function Stepper({
  steps,
  isChecked,
  nextStepId,
}: {
  steps: { id: number; name: string; position: number; icon?: ReactNode }[];
  isChecked: (index: number, step: any) => boolean;
  nextStepId: number;
}) {
  return (
    <Steps>
      {steps && steps.length
        ? steps.map((step, index) => (
            <Fragment key={step.id}>
              <Step key={step.id}>
                <Name>{step.name}</Name>

                <Circle checked={isChecked(index, step)} isNext={step.id === nextStepId}>
                  {isChecked(index, step) ? (
                    <CheckIcon
                      size="inherit"
                      style={isChecked(index, step) ? mountedStyle : unmountedStyle}
                    />
                  ) : (
                    <Number
                      style={isChecked(index, step) ? unmountedStyle : mountedStyle}
                      isNext={step.id === nextStepId}
                    >
                      {index + 1}
                    </Number>
                  )}
                </Circle>
              </Step>
              <Line
                checked={isChecked(index, step)}
                style={{
                  display: index === steps.length - 1 ? "none" : "block",
                }}
              />
            </Fragment>
          ))
        : null}
    </Steps>
  );
}

export default Stepper;
