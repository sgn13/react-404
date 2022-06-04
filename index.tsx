import ReactDOM from "react-dom";
import "theme/index.scss";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import ReactError from "pages/messages/react-error";
import AppThemeProvider from "theme/provider";
import { initializeStore } from "./store";
import AppRouter from "./App";

const store = initializeStore();
const errorHandler = (error: any, errorInfo: any) =>
  // eslint-disable-next-line no-console
  console.error("Logging error", errorInfo, error);

function AppIndex() {
  return (
    <ErrorBoundary FallbackComponent={ReactError} onError={errorHandler}>
      <Provider store={store}>
        <AppThemeProvider>
          <AppRouter />
        </AppThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

const mountingNode = document.querySelector("#root");

ReactDOM.render(<AppIndex />, mountingNode);
