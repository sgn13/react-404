import { Suspense } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useRoutes } from "react-router-dom";
import routes from "routes";
import { Loader } from "src/components/Spinner/Spinner";
import { fetchMe, setSidebar } from "src/store/app/actions";
import { AppState } from "src/store/reducer";

function AppRoutes() {
  const appRouters = useRoutes(routes);
  return appRouters;
}

function App({ setSidebar }: PropsFromRedux) {
  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  );
}

const mapStateToProps = ({ appState: { me, isLoading } }: AppState) => ({
  me,
  isLoading,
  setSidebar,
});

const mapDispatchToProps = { fetchMe, setSidebar };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
