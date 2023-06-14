import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

const getFlexbasisValue = (number, col = 12) =>
  number ? ` ${(number / col) * 100}%` : 'auto';

type BoxPropsType = ComponentPropsWithRef<'div'> & {
  debug?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullscreen?: boolean;
  fluidWidth?: boolean;
  fluidHeight?: boolean;
};

export const Box = styled.div<BoxPropsType>`
  ${({ debug }) => debug && `outline: 1px solid;`}
  position:relative;
  box-sizing: border-box;
  text-align: center;
  ${({ fullscreen }) => fullscreen && `width:100vw, height:100vh;`}
  ${({ fullWidth }) => fullWidth && `width:100vw;`}
  ${({ fullHeight }) => fullHeight && `height:100vh;`}
  ${({ fluidWidth }) => fluidWidth && `width:100%;`}
  ${({ fluidHeight }) => fluidHeight && `height:100%;`}
`;

type BasicKeywords = 'normal' | 'stretch';
type PositionalAlignments = 'start' | 'center' | 'end';
type HorizontalAlignments = PositionalAlignments | 'left' | 'right';
type VerticalAlignments = PositionalAlignments | 'flex-start' | 'flex-end';
type SelfAlignments = VerticalAlignments | 'self-start' | 'self-end';
type DistributedAlignments =
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type BaselineAlignments = 'baseline' | 'first baseline' | 'last baseline';
type OverflowAlignments = 'safe center' | 'unsafe center';
type GlobalValues = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
type FlexboxType = {
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  rowReverse?: boolean;
  column?: boolean;
  columnReverse?: boolean;
  wrap?: boolean;
  grow?: boolean;
  noShrink?: boolean;
  justifyContent?:
    | BasicKeywords
    | OverflowAlignments
    | GlobalValues
    | HorizontalAlignments
    | DistributedAlignments;

  alignItems?:
    | BasicKeywords
    | OverflowAlignments
    | GlobalValues
    | VerticalAlignments
    | BaselineAlignments;
  alignSelf?:
    | GlobalValues
    | OverflowAlignments
    | BaselineAlignments
    | SelfAlignments
    | 'normal'
    | 'auto';

  flexBasis?: string;
} & {
  item?: boolean;
  center?: boolean;
};

type FlexboxProps = BoxPropsType & FlexboxType;

export const Flexbox = styled(Box)<FlexboxProps>`
  display: flex;
  ${({ center }) => center && `justify-content:center; alignItems:center;`}
  ${({ item }) => (item ? `display: block;` : undefined)}
  ${({ gap }) => (gap ? `gap: ${gap};` : undefined)}
  ${({ rowGap }) => (rowGap ? `row-gap: ${rowGap};` : undefined)}
  ${({ columnGap }) => (columnGap ? `column-gap: ${columnGap};` : undefined)}
  ${({ wrap }) => (wrap ? 'flex-wrap: wrap;' : undefined)}
  ${({ rowReverse }) =>
    rowReverse ? `flex-direction: row-reverse;` : undefined}
  ${({ column }) => (column ? `flex-direction: column;` : undefined)}
  ${({ columnReverse }) =>
    columnReverse ? `flex-direction: column-reverse;` : undefined}
  ${({ grow }) => (grow ? `flex-grow: 1;` : undefined)}
  ${({ noShrink }) => (noShrink ? `flex-shrink: 0;` : undefined)}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content:${justifyContent};` : undefined};
  ${({ alignItems }) =>
    alignItems ? `align-items:${alignItems};` : undefined};
  ${({ alignSelf }) => (alignSelf ? `align-self:${alignSelf};` : undefined)};
  ${({ flexBasis }) => (flexBasis ? `flex-basis: ${flexBasis};` : undefined)}
`;

// Important Note: Flexbox is a single direction layout techonology.
// So <Col> <Row1/> <Row2/> </Col> is wrong usage of these component.
// Correct usage:
// <Row><Col 1/> <Col2/><Row/>
// Breakpoints are always applied on columns

type RowProps = FlexboxProps;
export const Row = styled(Flexbox)<RowProps>`
  display: flex;
  flex-wrap: wrap;
`;

const breakpoints = {
  xxs: '320px',
  xs: '360px',
  sm: '480px',
  md: '720px',
  lg: '992px',
  xl: '1280px',
  xxl: '1536px',
  xxxl: '1920px',
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

type ColPropsType = BoxPropsType & BreakpointPropsType & FlexboxProps;

// Mobile First Responsive Design
const dynamicMediaQueries = (props) =>
  Object.keys(breakpoints)
    .map(
      (key) =>
        `	
	    @media screen and (min-width: ${breakpoints[key]}) {
	      ${!!props[key] && ` flex-basis: ${getFlexbasisValue(props[key])}`};
	    }
	    `
    )
    .join(' ');

const dynamicMediaQueriesCss = (props) => css`
  ${dynamicMediaQueries(props)}
`;

export const Col = styled(Flexbox)<ColPropsType>`
  ${({ debug }) => debug && ` background-color: lightblue;`}

  /* Make col a flex item if it has no other props than children, theme, debug, key and style. Else make it a flex container as well. */
  ${({ children, theme, debug, style, key, ...rest }) =>
    Object.keys(rest).length ? null : 'display:block; flex-grow:1;'}
   

  // requires this because simply generating dynamic string is not interpreted as css
  ${(props) => dynamicMediaQueriesCss(props)}
`;
