import { Loader } from "components/Spinner/Spinner";
import { Suspense, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchMe } from "store/app/actions";
import { AppState } from "store/reducer";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./routes";

function App(props: PropsFromRedux) {
  const appRouters = useRoutes(routes);
  return (
    <Suspense fallback={<Loader />}>
      {appRouters}
      {/* <Layout
        navbar={<div>nav</div>}
        sidebar={<div>sidebar</div>}
        content={<div>content</div>}
        footer={null}
        /> */}
    </Suspense>
  );
}

const mapStateToProps = ({ appState: { me, isLoading } }: AppState) => ({ me, isLoading });
const mapDispatchToProps = { fetchMe };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
