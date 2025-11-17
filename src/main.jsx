import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext.jsx";
import { MatchProvider } from "./context/MatchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TeamProvider>
        <MatchProvider>
          <App />
        </MatchProvider>
      </TeamProvider>
    </BrowserRouter>
  </StrictMode>
);
