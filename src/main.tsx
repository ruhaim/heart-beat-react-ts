import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { makeServer } from "./server.ts";
import { store } from "./store/store";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";

makeServer({ environment: "development" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
