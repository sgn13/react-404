import { useEffect, ComponentType } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type PropsForNewComponent = { redirectTo?: string };

function withProtectedRoute(WrappedComponent: ComponentType<any>) {
  function newComponent({ redirectTo = "/login", ...rest }: PropsForNewComponent) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
      if (!sessionStorage.getItem("accessToken")) {
        return navigate(redirectTo, { replace: false, state: { from: pathname } });
      }
    }, []);

    return <WrappedComponent {...rest} />;
  }

  return newComponent;
}

export default withProtectedRoute;

// usage:
// const HomepageWithProtection = withAuth(Homepage);
// <HomepageWithProtection redirectTo="/login" />
