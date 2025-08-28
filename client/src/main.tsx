import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LobbyProvider } from "./context/LobbyContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LobbyProvider>
      <App />
    </LobbyProvider>
  </StrictMode>
);
