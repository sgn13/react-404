import ReactDOM from "react-dom/client";
import "theme/sass/index.scss";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import ReactError from "pages/errors/react-error";
import { StyledThemeProvider } from "theme/styled";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Routes from "./App";
import { initializeStore } from "./store";

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
        <StyledThemeProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </StyledThemeProvider>
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
