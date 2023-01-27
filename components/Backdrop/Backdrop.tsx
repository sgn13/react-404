import React from "react";
import styled from "../../theme/styled";

const StyledBackdrop = styled.div<{ open: boolean; transitionDuration }>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: ${({ open }) => (open ? 999 : -10)};
  left: 0;
  top: 0;
  background-color: rgba(97, 96, 96, 0.5);
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: ${({ transitionDuration }) =>
    transitionDuration ? `${transitionDuration} ease all` : "0.3s ease all"};
`;

const Backdrop = ({
  open,
  transitionDuration = "0.3s",
  onClose,
  backdropStyle = {},
  children,
}) => {
  return (
    <StyledBackdrop
      onClick={onClose}
      transitionDuration={transitionDuration}
      open={open}
      style={backdropStyle}
    >
      {children}
    </StyledBackdrop>
  );
};

export default Backdrop;
