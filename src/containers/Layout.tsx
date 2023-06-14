import { useEffect, useRef, useState } from "react";
import { Flexbox } from "src/containers/Grid/Grid";
import styled from "styled-components";

import { ConnectedProps, connect } from "react-redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Loader } from "src/components/Spinner/Spinner";
import { AppState } from "src/store/reducer";
import AnimationManager from "./AnimationManager";
import DropdownSidebar from "./DropdownSidebar";
import Heading from "./Header/Header";

const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  font-family: Lato;
  font-weight: 400;
  .react-tooltip {
    background-color: lightblue;
    color: black;
    z-index: 5;
    opacity: 1;
  }
`;

const Header = styled.header<{ fullSidebar; width }>`
  display: block;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${({ theme }) => theme.constant.header.zIndex};
  height: ${({ theme }) => theme.constant.header.height}px;
  width: 100%;
  ${({ theme, fullSidebar, width }) =>
    fullSidebar
      ? ` width: calc(100% - ${
          width ? `${width}px` : `${theme.constant.sidebar.width}px`
        }); margin-left:  ${width ? `${width}px` : `${theme.constant.sidebar.width}px`};`
      : null}

  transition:0.3s all ease-out;
`;

const FillHeaderSpace = styled.div<{ fullSidebar?: boolean; width?: number }>`
  height: ${({ theme }) => theme.constant.header.height}px;
  width: 100%;
  ${({ theme, fullSidebar, width }) =>
    fullSidebar
      ? ` width: calc(100% - ${
          width ? `${width}px` : `${theme.constant.sidebar.width}px`
        }); margin-left:  ${width ? `${width}px` : `${theme.constant.sidebar.width}px`};`
      : null}

  transition:0.3s all ease-out;
`;

const Footer = styled.footer<{
  fullWidthFooter?: boolean;
  height?: string;
  fixedFooter?: boolean;
}>`
  display: block;
  height: ${({ theme }) => theme.constant.footer.height}px;
  width: 100%;
  background-color: lightblue;
  ${({ fixedFooter, fullWidthFooter }) =>
    fixedFooter && !fullWidthFooter
      ? `
    position: fixed;
    bottom: 0px;
  `
      : null}

  ${({ fullWidthFooter }) =>
    fullWidthFooter
      ? `
      position: fixed;
       bottom: 0px;
       left:0px;
       right:0px;`
      : null}
  z-index: ${({ theme }) => theme.constant.footer.zIndex};
`;

const FillFooterSpace = styled.div`
  height: ${({ theme }) => theme.constant.footer.height}px;
  width: 100%;
  background-color: #efd10c57;
`;

const header = <div>header</div>;

function Layout({
  children,
  footer = <div>footer</div>,
  fullSidebar = true,
  fixedFooter = false,
  fullWidthFooter = false,
  sidebar,
  isLoading,
  showFooter = false,
}: PropsFromRedux | any) {
  const contentSectionRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState();
  console.log("layout");

  useEffect(() => {
    console.log(" layout mounted");
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header fullSidebar={fullSidebar} width={sidebarWidth}>
        {/* {header} */}
        <Heading />
      </Header>
      <FillHeaderSpace fullSidebar={fullSidebar} width={sidebarWidth} />

      <Flexbox ref={contentSectionRef}>
        <DropdownSidebar
          data={sidebar}
          nodeKey="label"
          iconSize={40}
          contentSectionRef={contentSectionRef}
          setSidebarWidth={setSidebarWidth}
          fullSidebar={fullSidebar}
          fullWidthFooter={fullWidthFooter}
        />
        <Flexbox column grow>
          <Flexbox style={{ padding: 30 }}>
            <AnimationManager>{children}</AnimationManager>
          </Flexbox>
          {showFooter ? (
            <>
              {fixedFooter ? <FillFooterSpace /> : null}
              <Footer fixedFooter={fixedFooter} fullWidthFooter={fullWidthFooter}>
                {footer}
              </Footer>
            </>
          ) : null}
        </Flexbox>
      </Flexbox>
      <Tooltip id="my-tooltip" place="right" className="react-tooltip" />
    </Container>
  );
}

const mapStateToProps = ({ appState: { me, notification, isLoading, sidebar } }: AppState) => ({
  me,
  notification,
  isLoading,
  sidebar,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Layout);
