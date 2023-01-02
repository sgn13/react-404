import { ComponentPropsWithRef } from "react";
import styled, { css } from "styled-components";

const getFlexbasisValue = (number, col = 12) => (number ? ` ${(number / col) * 100}%` : "auto");

type BoxPropsType = ComponentPropsWithRef<"div"> & { debug?: boolean };

export const Box = styled.div<BoxPropsType>`
  ${({ debug }) => debug && `outline: 1px solid;`}
  box-sizing: border-box;
`;

type ContainerPropsType = BoxPropsType & {
  centerHorizontally?: boolean;
  centerVertically?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullscreen?: boolean;
  fluidWidth?: boolean;
  fluidHeight?: boolean;
};

export const Container = styled(Box)<ContainerPropsType>`
  position: relative;
  ${({ centerHorizontally }) => centerHorizontally && `display:flex; justify-content:center;`}
  ${({ centerVertically }) => centerVertically && `display:flex; align-items:center;`}
  ${({ fullscreen }) => fullscreen && `width:100vw, height:100vh;`}
  ${({ fullWidth }) => fullWidth && `width:100vw;`}
  ${({ fullHeight }) => fullHeight && `height:100vh;`}
  ${({ fluidWidth }) => fluidWidth && `width:100%;`}
  ${({ fluidHeight }) => fluidHeight && `height:100%;`}
`;

export const Row = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const breakpoints = {
  xxs: "320px",
  xs: "360px",
  sm: "480px",
  md: "720px",
  lg: "992px",
  xl: "1280px",
  xxl: "1536px",
  xxxl: "1920px",
};

type BreakpointPropsType = {
  xxs?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
};

type ColPropsType = BoxPropsType & BreakpointPropsType;

// Mobile First Responsive Design
const dynamicMediaQueries = (props) =>
  Object.keys(breakpoints)
    .map(
      (key) =>
        `	
	    @media screen and (min-width: ${breakpoints[key]}) {
	      ${!!props[key] && ` flex-basis: ${getFlexbasisValue(props[key])}`};
	    }
	    `,
    )
    .join(" ");

const dynamicMediaQueriesCss = (props) => css`
  ${dynamicMediaQueries(props)}
`;

export const Col = styled(Box)<ColPropsType>`
  ${({ debug }) => debug && ` background-color: lightblue;`}

  ${({ children, theme, debug, style, ...rest }) =>
    Object.keys(rest).length ? null : "flex-grow:1;"}

  // requires this because simply generating dynamic string is not interpreted as css
  ${(props) => dynamicMediaQueriesCss(props)}
`;

// Important Note: Flexbox is a single direction layout techonology.
// So <Col> <Row1/> <Row2/> </Col> is wrong usage of these component.
// Breakpoints are always applied on columns
