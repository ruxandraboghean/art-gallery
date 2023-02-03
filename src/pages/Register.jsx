import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo-default.png";
import background from "../images/background.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Register = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkPassword = e.target[3].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
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
          </form>
          <p className="form-paragraph">
            {" "}
            Already have an account? <a href="/login"> Login </a>{" "}
          </p>
        </div>
        <div className="image-wrapper">
          <img src={background} alt="Background" className="background" />
        </div>
      </div>
    </>
  );
};
