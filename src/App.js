import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { AuthContext } from "./context/AuthContext";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Gallery } from "./pages/Gallery";
import { Courses } from "./pages/Courses";
import { Home } from "./pages/Home";
import { Messages } from "./pages/Messages";
import { Works } from "./pages/Works";
import { Artists } from "./pages/Artists";
import { AddArtwork } from "./pages/AddArtwork";
import { ManageArtworks } from "./pages/ManageArtworks";

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
            <Route path="/gallery">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Gallery />
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
            <Route path="/courses">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Courses />
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
            <Route path="/works">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Works />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/add-artwork">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <AddArtwork />
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

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
