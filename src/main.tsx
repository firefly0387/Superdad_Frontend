import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={2500}
      />
    </HelmetProvider>
  </StrictMode>
);