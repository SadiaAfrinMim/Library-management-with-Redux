import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom"; // ✅ Correct router import
import { ThemeProvider } from "@/components/theme-provider";


// ✅ You must import these:
import { store } from "@/redux/store"; // adjust path if different
import { router } from "@/routes";     // adjust path if different
import App from "./App";              // make sure App is imported
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={router} />
           <ToastContainer />
          <App />
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
}
