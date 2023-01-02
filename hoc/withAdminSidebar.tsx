import { useEffect } from "react";
import { connect } from "react-redux";
import { setSidebar } from "store/app/actions";
import { AdminSidebar } from "constants/sidebar";
import withAuth from "hoc/withAuth";

export const withSidebar = (WrappedComponent) => {
  // eslint-disable-next-line no-shadow
  // eslint-disable-next-line @typescript-eslint/no-shadow
  function HOC({ setSidebar, ...rest }) {
    useEffect(() => {
      setSidebar(AdminSidebar());
    }, []);
    return <WrappedComponent {...rest} />;
  }

  const mapStateToProps = ({ appState: { me } }) => ({ appState: { me } });

  const mapDispatchToProps = {
    setSidebar,
  };

  const connector = connect(mapStateToProps, mapDispatchToProps);

  return connector(withAuth(HOC));
};

export default withSidebar;
