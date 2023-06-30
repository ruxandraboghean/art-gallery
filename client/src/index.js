import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "font-awesome/css/font-awesome.min.css";
import "@fontsource/roboto-mono";
import { ChatContextProvider } from "./context/ChatContext";
import { ArtworkModalContextProvider } from "./context/ArtworkModalContext";
import { RequestContextProvider } from "./context/RequestsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ArtworkModalContextProvider>
        <RequestContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </RequestContextProvider>
      </ArtworkModalContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
