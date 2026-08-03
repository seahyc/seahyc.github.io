import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BobaPage } from "./BobaPage";
import "./boba.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><BobaPage /></StrictMode>,
);
