import { useEffect, ComponentType } from "react";

import { connect, ConnectedProps } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { fetchMe } from "store/app/actions";

import { AppState } from "store/reducer";
import checkPermission from "utils/checkPermission";

type PropsForNewComponent = { allowAccessTo?: string[] };

function withProtectedRoute(WrappedComponent: ComponentType<any>) {
  function newComponent({
    me,
    isLoading,
    allowAccessTo,
    ...rest
  }: PropsFromRedux & PropsForNewComponent) {
    let location = useLocation();

    if (me && me?.permissions) {
      // if allowAccessTo is empty array, it means no authorization check.
      const authorizationDisabled =
        !allowAccessTo || (Array.isArray(allowAccessTo) && allowAccessTo.length === 0);
      if (!authorizationDisabled && !checkPermission(allowAccessTo, me?.permission))
        // save the user's previous location before redirecting to /unauthorized for future use
        return <Navigate to="/forbidden" state={{ from: location }} />;
    }

    // Initial loading and error
    return <WrappedComponent {...rest} />;
  }

  const mapStateToProps = ({ appState: { me, isLoading } }: AppState) => ({ me, isLoading });
  const mapDispatchToProps = { fetchMe };
  const connector = connect(mapStateToProps, mapDispatchToProps);
  type PropsFromRedux = ConnectedProps<typeof connector>;
  return connector(newComponent);
}

export default withProtectedRoute;
