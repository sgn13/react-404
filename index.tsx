import ReactDOM from "react-dom";
import "theme/sass/index.scss";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import ReactError from "pages/errors/react-error";
import { StyledThemeProvider } from "theme/styled";
import { BrowserRouter } from "react-router-dom";
import Routes from "./App";
import { initializeStore } from "./store";

const store = initializeStore();
const errorHandler = (error: any, errorInfo: any) => {
  // eslint-disable-next-line no-console
  console.error("Logging error", errorInfo, error);
};

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

const mountingNode = document.querySelector("#root");

ReactDOM.render(<AppIndex />, mountingNode);

// "config": {
//   "commitizen": {
//     "path": "./node_modules/cz-conventional-changelog"
//   }
// }
