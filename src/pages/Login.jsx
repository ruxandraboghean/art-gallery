import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo-default.png";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <div className="center">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="progress-bar"></div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="&#xF007;&nbsp;&nbsp; username"
              className="form-input"
            />
            <input
              type="password"
              placeholder="&#xf023;&nbsp;&nbsp; password"
              className="form-input"
            />
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
        </div>
        <div className="image-wrapper"></div>
      </div>
    </>
  );
};
