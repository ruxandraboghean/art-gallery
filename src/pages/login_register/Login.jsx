import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import logo from "../../images/logo/no_illusion_logo.png";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setErr(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <div className="background-form">
            <div className="center">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="progress-bar"></div>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <div className="input-icons">
                  <i className="fa fa-envelope"></i>
                  <input type="email" placeholder="email" />
                </div>
                <div className="input-icons">
                  <i className="fa fa-duotone fa-lock"></i>
                  <input type="password" placeholder="password" />
                </div>
              </div>
              <button className="form-button">
                <span className="text">Login</span>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="fa-circle-arrow-right"
                />
              </button>
              {err && (
                <span>
                  {" "}
                  Something went wrong. Please verify your credentials!{" "}
                </span>
              )}
            </form>
            <p>
              You don't have an account?{" "}
              <Link to="/register" className="link">
                Register
              </Link>
            </p>
            {isLoading && (
              <div>
                <ClipLoader
                  size={30}
                  className="spinner"
                  aria-label="Loading Spinner"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
