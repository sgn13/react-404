import { useEffect } from "react";

import { connect } from "react-redux";

import { AppState } from "store/reducer";

export const withAuth = (WrappedComponent) => {
  function HOC(props) {
    useEffect(() => {}, []);
    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = ({ appState: { me } }: AppState) => ({ me });

  const mapDispatchToProps = {};

  const connector = connect(mapStateToProps, mapDispatchToProps);

  return connector(HOC);
};

export default withAuth;
