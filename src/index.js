import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { AuthContextProvider } from "./components/Chat/AuthContext";
import "font-awesome/css/font-awesome.min.css";
import "@fontsource/roboto-mono";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);
