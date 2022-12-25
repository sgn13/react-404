import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setSidebar } from "store/app/actions";
import { AdminSidebar } from "constants/sidebar";
import withAuth from "hoc/withAuth";

export const withSidebar = (WrappedComponent) => {
  const HOC = ({ setSidebar, ...rest }) => {
    useEffect(() => {
      setSidebar(AdminSidebar({}));
    }, []);
    return <WrappedComponent {...rest} />;
  };

  const mapStateToProps = ({}) => ({});

  const mapDispatchToProps = {
    setSidebar,
  };

  const connector = connect(mapStateToProps, mapDispatchToProps);

  return connector(withAuth(HOC));
};

export default withSidebar;
