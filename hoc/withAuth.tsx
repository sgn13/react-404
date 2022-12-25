import React, { useEffect } from "react";

import { connect } from "react-redux";

import { AppState } from "store/reducer";

export const withAuth = (WrappedComponent) => {
  function HOC(props) {
    useEffect(() => {}, []);
    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = ({}: AppState) => ({});

  const mapDispatchToProps = {};

  const connector = connect(mapStateToProps, mapDispatchToProps);

  return connector(HOC);
};

export default withAuth;
