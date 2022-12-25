import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setSidebar } from "store/app/actions";
import { IndexSidebar } from "constants/sidebar";
import withAuth from "hoc/withAuth";

export const withSidebar = (WrappedComponent) => {
  // The sole purpose of this HOC is to set sidebar in redux store everytime any of the Layout components mount.
  // so that the sidebar for the respective component is available in store to render.

  // The HOC will receive all the props passed by the redux connector to its component.
  // This way we don't have to set sidebar in each component separately
  const HOC = ({ setSidebar, ...rest }) => {
    useEffect(() => {
      setSidebar(IndexSidebar({}));
    }, []);

    return <WrappedComponent {...rest} />;
  };

  const mapStateToProps = ({}) => ({});

  const mapDispatchToProps = {
    setSidebar,
  };

  const connector = connect(mapStateToProps, mapDispatchToProps);

  // Passing HOC via Another withAuthHOC before returning our final component.
  return connector(withAuth(HOC));
};

export default withSidebar;
