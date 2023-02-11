import { Loader } from "components/Spinner/Spinner";
import Layout from "containers/Layout";
import { Suspense, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchMe } from "store/app/actions";
import { AppState } from "store/reducer";
import { useRoutes } from "react-router-dom";

import { authRoutes, messageRoutes } from "./routes";

const AuthContents = () => useRoutes(authRoutes);
const MessageContents = () => useRoutes(messageRoutes);

// All those routes which does not shared the layout, are rendered here.
// Remaining routes will be rendered inside the Layout Component because they all will be sharing the same layout.
// fix refresh
// add layout and not layout
function App(props: PropsFromRedux) {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <AuthContents />
        <MessageContents />
        <Layout
          navbar={<div>nav</div>}
          sidebar={<div>sidebar</div>}
          content={<div>content</div>}
          footer={null}
        />
      </Suspense>
    </div>
  );
}

const mapStateToProps = ({ appState: { me, isLoading } }: AppState) => ({ me, isLoading });
const mapDispatchToProps = { fetchMe };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
