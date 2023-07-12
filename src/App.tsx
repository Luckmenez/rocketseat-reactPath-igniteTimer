import { ThemeProvider, StyleSheetManager } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/globals";
import { Router } from "./Router";
import { CycleContextProvider } from "./contexts/CycleContexts";
import isPropValid from "@emotion/is-prop-valid";

export function App() {
  return (
    <StyleSheetManager
      enableVendorPrefixes
      shouldForwardProp={(propName, elementToBeRendered) => {
        return typeof elementToBeRendered === "string"
          ? isPropValid(propName)
          : true;
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <CycleContextProvider>
            <Router />
          </CycleContextProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </StyleSheetManager>
  );
}
