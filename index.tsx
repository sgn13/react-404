import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Notification from "src/components/Notification_old/Notification";
import ReactThemeProvider from "src/containers/ReactThemeProvider/ReactThemeProvider";
import ReactError from "src/features/errors/ReactError";
import { MuiThemeProvider } from "src/lib/mui/MuiThemeProvider";
import { initializeStore } from "src/store";
import "src/styles/index.scss";
import "src/theme_old/sass/index.scss";
import { StyledThemeProvider } from "src/theme_old/styled";
import Routes from "./App";
// import ReactThemeProvider from "containers/ReactThemeProvider/ReactThemeProvider";

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
        <ReactThemeProvider>
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
            <MuiThemeProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </MuiThemeProvider>
          </StyledThemeProvider>
        </ReactThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <AppIndex />,
  // </React.StrictMode>,
);
