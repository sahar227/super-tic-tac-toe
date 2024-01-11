import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // random strategy does not work well with React.StrictMode so we disable it for now
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
