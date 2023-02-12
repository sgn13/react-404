import { Loader } from "components/Spinner/Spinner";
import Layout from "containers/Layout";
import { Suspense } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchMe } from "store/app/actions";
import { AppState } from "store/reducer";
import { useRoutes } from "react-router-dom";

import routes from "./routes";

function App(props: PropsFromRedux) {
  const allRoutings = useRoutes(routes);

  return (
    <Suspense fallback={<Loader />}>
      {allRoutings}
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
