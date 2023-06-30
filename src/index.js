import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "font-awesome/css/font-awesome.min.css";
import "@fontsource/roboto-mono";
import { ChatContextProvider } from "./context/ChatContext";
import { ArtworkModalContextProvider } from "./context/ArtworkModalContext";
import { RequestContextProvider } from "./context/RequestsContext";
import { app } from "firebase";

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
app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});