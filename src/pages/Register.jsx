import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo/no_illusion_logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Register = () => {
  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <div className="background-form">
            <div className="center">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="register-user">
              <div className="register-as">Register as</div>
              <div className="users">
                <div className="user">
                  user
                  <Link to="/register-user" className="arrow-right">
                    <FontAwesomeIcon
                      icon={faCircleArrowRight}
                      className="arrow-right"
                    />
                  </Link>
                </div>
                <div className="expert">
                  expert
                  <Link to="/register-expert" className="arrow-right">
                    <FontAwesomeIcon
                      icon={faCircleArrowRight}
                      className="arrow-right"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
