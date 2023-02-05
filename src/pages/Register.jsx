import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/General/logo-default.png";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkPassword = e.target[3].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-wrapper center">
          <div className="center">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="meter orange nostripes">
            <span></span>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <input type="text" placeholder="&#xF007;&nbsp;&nbsp; username" />
            <input type="email" placeholder="&#xf0e0;&nbsp;&nbsp; email" />
            <input
              type="password"
              placeholder="&#xf023;&nbsp;&nbsp; password"
            />
            <input
              type="password"
              placeholder="&#xf023;&nbsp;&nbsp; confirm password"
            />
            <button>
              <span className="text">Next</span>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow-right"
              />
            </button>
            {err && <span> Something went wrong </span>}
          </form>
          <p>
            {" "}
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
        <div className="image-wrapper"></div>
      </div>
    </>
  );
};
