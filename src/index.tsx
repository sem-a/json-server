import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PATHS } from "./paths";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <App />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
