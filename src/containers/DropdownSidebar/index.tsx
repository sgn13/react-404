import { ReactNode, useEffect, useState } from "react";
import styled from "../../theme_old/styled";
import DropdownSidebar from "./DropdownSidebar";

export const headerZIndex = 1;
export const headerHeight = 80;
export const sidebarZIndex = 2;
export const sidebarWidth = 270;
export const sidebarMaxWidth = 500;
export const sidebarMinWidth = 100;

const DraggingHandle = styled.div`
  position: absolute;
  width: 3px;
  background-color: transparent;
  top: 5px;
  right: 0px;
  user-select: none;
  height: calc(100% - 5px);
  z-index: 9999999;

  :hover {
    cursor: col-resize;
  }
`;

const Draggable = styled.aside<{
  iconSize;
  width;
  fullSidebar;
  sliderHeld;
}>`
  position: fixed;
  top: ${({ theme }) => theme.constant.header.height}px;
  left: 0px;
  width: ${({ iconSize, width }) => (iconSize === width ? `${iconSize}px;` : `${width}px;`)};
  min-width: ${({ iconSize, width, isCollapsed }) =>
    iconSize === width ? `${iconSize}px;` : `${width}px;`};
  overflow: auto;
  height: ${({ theme, fullWidthFooter }) =>
    fullWidthFooter
      ? `calc(100vh - ${theme.constant.header.height + theme.constant.footer.height}px)`
      : "100vh"};
  ${({ fullSidebar, theme }) =>
    fullSidebar ? `top: 0px;height:100vh;z-index:${theme.constant.header.zIndex + 1}; ` : null}
  border-right: 0.5px solid transparent;
  transition: 0.2s border;
  ${({ sliderHeld }) => (sliderHeld ? null : ` transition: 0.2s border, 0.3s width ease-out;`)}

  ${({ sliderHeld }) =>
    sliderHeld
      ? `border-right-color: #02c7e6;
  border-right-width: 3px;`
      : null}
  z-index:${({ theme }) => theme.constant.sidebar.zIndex};
  background: linear-gradient(45deg, #101828 0%, #164996 100%);
`;

const FillSidebarSpace = styled.div<{ fullWidthFooter; sliderHeld; width; iconSize }>`
  ${({ sliderHeld }) => (sliderHeld ? null : `transition: 0.3s width ease-out;`)}
  background-color:transparent;
  width: ${({ iconSize, width }) => (iconSize === width ? `${iconSize}px;` : `${width}px;`)};
  min-width: ${({ iconSize, width, isCollapsed }) =>
    iconSize === width ? `${iconSize}px;` : `${width}px;`};
  height: ${({ theme, fullWidthFooter }) =>
    fullWidthFooter
      ? `calc(100vh - ${theme.constant.header.height + theme.constant.footer.height}px)`
      : `calc(100vh - ${theme.constant.header.height}px)`};
`;

const handleWidthOffset = 3;

function DraggableSidebar({
  children,
  contentSectionRef,
  iconSize,
  data,
  nodeKey,
  setSidebarWidth,
  fullWidthFooter,
  ...rest
}: {
  children: ReactNode;
  contentSectionRef: any;
}) {
  const [width, setWidth] = useState(sidebarWidth);
  const [isResizable, setIsResizable] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(width);

  const toggleSidebar = () => {
    if (width === iconSize) {
      setWidth(previousWidth);
      setSidebarWidth(previousWidth);
    } else {
      setPreviousWidth(width);
      setWidth(iconSize);
      setSidebarWidth(iconSize);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    // console.log("mouse away", event.clientX);
    // console.log("left", event.currentTarget.getBoundingClientRect().left);
    if (!isResizable) return;
    const { left } = event.currentTarget.getBoundingClientRect();
    // if you wish to get this value using ref, you can use the following:
    // const left = ref.current.getBoundingClientRect().left;
    const newWidth = event.clientX - left + handleWidthOffset;

    if (newWidth >= iconSize) {
      if (newWidth >= sidebarMaxWidth) {
        setIsResizable(false);
        return;
      }

      if (newWidth <= sidebarMinWidth) {
        toggleSidebar();
        setIsResizable(false);
        return;
      }
      setSidebarWidth(newWidth);
      // const root = document.querySelector(":root");
      // root.style.setProperty("--sidebar-width", newWidth);
      setWidth(newWidth);
    }
  };

  useEffect(() => {
    if (!contentSectionRef.current || !isResizable) return;
    contentSectionRef.current.addEventListener("mousemove", handleMouseMove);
    return () => contentSectionRef.current.removeEventListener("mousemove", handleMouseMove);
  }, [contentSectionRef.current, isResizable]);

  const allowResize = (event) => {
    event.stopPropagation();
    // console.log("mouse down");
    setIsResizable(true);
  };

  const stopResize = (event) => {
    event.stopPropagation();
    // console.log("mouse up");
    setIsResizable(false);
  };

  return (
    <>
      <Draggable
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={stopResize}
        width={width}
        iconSize={iconSize}
        sliderHeld={isResizable}
        fullWidthFooter={fullWidthFooter}
        {...rest}
      >
        <DraggingHandle onMouseDown={allowResize} onMouseUp={stopResize} />
        <DropdownSidebar
          {...{
            iconSize,
            toggleSidebar,
            width,
            setWidth,
            data,
            nodeKey,
            setSidebarWidth,
          }}
        />
      </Draggable>
      <FillSidebarSpace
        width={width}
        iconSize={iconSize}
        fullWidthFooter={fullWidthFooter}
        sliderHeld={isResizable}
      />
    </>
  );
}

export default DraggableSidebar;
