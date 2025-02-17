import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PATHS } from "./paths";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Add from "./pages/Add";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <App />,
  },
  {
    path: PATHS.add,
    element: <Add />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
