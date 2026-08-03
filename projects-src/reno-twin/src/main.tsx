import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TwinApp } from "./TwinApp";
import "./twin.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TwinApp />
  </StrictMode>,
);
