import { useEffect, ComponentType } from "react";

import { connect, ConnectedProps } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { fetchMe } from "store/app/actions";

import { AppState } from "store/reducer";
import checkPermission from "utils/checkPermission";

type PropsFromWrapper = { allowAccessTo?: "everyone" | string | string[] };

function withAuth(WrappedComponent: ComponentType<any>) {
  function newComponent(props: PropsFromRedux & PropsFromWrapper) {
    // const navigate = useNavigate();
    // const { pathname } = useLocation();
    const {
      fetchMe,
      me,
      isLoading,
      allowAccessTo,
      allPermissions = ["admin", "deliveryBoy", "manager"],
    } = props;

    useEffect(() => {
      if (!me) fetchMe();
    }, [me]);

    if (!sessionStorage.getItem("accessToken")) return <Navigate to="/login" />;

    if (me && me?.permission) {
      const authorizationDisabled = allowAccessTo === "everyone";
      if (!authorizationDisabled && !checkPermission(allowAccessTo, allPermissions))
        return <Navigate to="/unauthorized" />;
    }

    // if (isLoading) return <div>Loading...</div>;

    // Initial loading and error
    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = ({ appState: { me, isLoading } }: AppState) => ({ me, isLoading });
  const mapDispatchToProps = { fetchMe };
  const connector = connect(mapStateToProps, mapDispatchToProps);
  type PropsFromRedux = ConnectedProps<typeof connector>;
  return connector(newComponent);
}

export default withAuth;
