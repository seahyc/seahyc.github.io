import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ShowerPage } from "./ShowerPage";
import "./shower.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><ShowerPage /></StrictMode>,
);
