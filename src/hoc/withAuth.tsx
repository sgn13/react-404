import { ComponentType, useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMe } from "src/store/app/actions";

type PropsForNewComponent = { redirectTo?: string };

function withAuth(WrappedComponent: ComponentType<any>) {
  function newComponent({
    fetchMe,
    redirectTo = "/login",
    ...rest
  }: PropsFromRedux & PropsForNewComponent) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    // const isLoginPage = useMatch("/login");

    useEffect(() => {
      // const loggedIn = sessionStorage.getItem("accessToken");
      // if (loggedIn) {
      //   fetchMe();
      // } else {
      //   navigate(redirectTo, { replace: false, state: { from: pathname } });
      // }
    }, []);

    return <WrappedComponent {...rest} />;
  }
  const mapStateToProps = ({ appState: {} }) => ({});

  const mapDispatchToProps = { fetchMe };
  const connector = connect(mapStateToProps, mapDispatchToProps);
  type PropsFromRedux = ConnectedProps<typeof connector>;

  return connector(newComponent);
}

export default withAuth;
