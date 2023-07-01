import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { AuthContext } from "./context/AuthContext";
import { Register } from "./pages/common/login_register/Register";
import { Login } from "./pages/common/login_register/Login";
import { Home } from "./pages/common/Home";
import { RegisterExpert } from "./pages/common/login_register/RegisterExpert";
import { RegisterUser } from "./pages/common/login_register/RegisterUser";
import { RegisterValidator } from "./pages/common/login_register/RegisterValidator";

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

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-expert" element={<RegisterExpert />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/register-validator" element={<RegisterValidator />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
