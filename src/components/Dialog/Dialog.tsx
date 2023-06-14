import React from "react";
import { FaTimes } from "react-icons/fa";
import Backdrop from "src/components/Backdrop/Backdrop";
import styled from "src/theme_old/styled";

type StyledDialogType = {
  open: boolean;
  onClose: () => void;
  actions?: any;
};

type BaseDialogType = React.ComponentProps<"div"> & StyledDialogType & { ref?: any };

const Header = styled.div`
  display: flex;
  background: black;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  /* border-bottom-left-radius: 1rem; */
  /* border-bottom-right-radius: 1rem; */
`;

const ModalWrap = styled.div<{ open: boolean }>`
  // centering the dialog
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 9999;
  transition: 0.3s ease all;
  display: ${({ open }) => (open ? "block" : "none")};
  border-radius: 8px;
`;

const DialogWrap = styled.div<{ fullscreen }>`
  background-color: #eee;
  outline: none;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: fit-content;
  ${({ fullscreen }) =>
    fullscreen &&
    `width: 100vw;
  height: 100vh;
  border-radius: 0px;`}
`;

const DialogContent = styled.div`
  line-height: 1.5;
  color: #555;
  padding: 1rem;
  box-sizing: border-box;
`;

const DialogActions = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Dialog: React.FC<BaseDialogType> = ({
  children,
  actions,
  open,
  onClose,
  title,
  dialogStyle = {},
  showHeader = true,
  headerStyle = {},
  backdropStyle = {},
  fullscreen = false,
  ...rest
}) => {
  return (
    <>
      <Backdrop style={backdropStyle} open={open} onClose={onClose} />
      <ModalWrap open={open} {...rest}>
        <DialogWrap style={dialogStyle} fullscreen={fullscreen}>
          {showHeader ? (
            <Header style={headerStyle}>
              {title && <h4>{title}</h4>}
              <FaTimes style={{ cursor: "pointer" }} onClick={onClose} />
            </Header>
          ) : null}
          {children && <DialogContent>{children}</DialogContent>}
          {actions && <DialogActions>{actions}</DialogActions>}
        </DialogWrap>
      </ModalWrap>
    </>
  );
};

export default Dialog;
