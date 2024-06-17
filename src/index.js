import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// );
document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
  // else {
  //   console.error("Root element with id 'root' not found.");
  // }
});
reportWebVitals();
