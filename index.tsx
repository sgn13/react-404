import ReactDOM from "react-dom/client";
import "theme/sass/index.scss";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import ReactError from "pages/Errors/ReactError";
import { StyledThemeProvider } from "theme/styled";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Routes from "./App";
import { initializeStore } from "./store";
import Notification from "components/Notification/Notification";
import ReactThemeProvider from "containers/ReactThemeProvider/ReactThemeProvider";

const store = initializeStore();
const errorHandler = (error: any, errorInfo: any) => {
  // eslint-disable-next-line no-console
  console.error("Logging error", errorInfo, error);
};

// on every referesh, Index.tsx-->App.tsx --> Layout.tsx --> HOC --> HOCComponent is the execution order.

function AppIndex() {
  return (
    <ErrorBoundary FallbackComponent={ReactError} onError={errorHandler}>
      <ReduxProvider store={store}>
        {/* <ReactThemeProvider> */}
        <StyledThemeProvider>
          <Notification
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </StyledThemeProvider>
        {/* </ReactThemeProvider> */}
      </ReduxProvider>
    </ErrorBoundary>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppIndex />
  </React.StrictMode>,
);
