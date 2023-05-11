import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { AuthContext } from "./context/AuthContext";
import { Register } from "./pages/login_register/Register";
import { Profile } from "./pages/users/Profile";
import { Login } from "./pages/login_register/Login";
import { Home } from "./pages/Home";
import { Messages } from "./pages/chat/Messages";
import { Exhibitions } from "./pages/exhibition/Exhibitions";
import { Artists } from "./pages/users/Artists";
import { ManageArtworks } from "./pages/artwork/ManageArtworks";
import { RegisterExpert } from "./pages/login_register/RegisterExpert";
import { RegisterUser } from "./pages/login_register/RegisterUser";
import { Work } from "./pages/artwork/Work";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/profile">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/messages">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/artists">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Artists />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/exhibitions">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Exhibitions />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/manage-artwork">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ManageArtworks />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/work">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Work />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-expert" element={<RegisterExpert />} />
            <Route path="/register-user" element={<RegisterUser />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
