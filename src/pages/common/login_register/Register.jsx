import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo/no_illusion_logo.png";
import user from "../../../images/user.png";
import expert from "../../../images/verified-account.png";

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
              <div className="users">
                <Link
                  to="/register-user"
                  state={{ from: "user" }}
                  className="arrow-right"
                >
                  <div className="user">
                    <img src={user} alt="user" className="user_icon" />
                    <span className="register_account">user</span>
                  </div>
                </Link>
                <Link
                  to="/register-expert"
                  state={{ from: "expert" }}
                  className="arrow-right"
                >
                  <div className="user">
                    <img src={expert} alt="expert" className="expert_icon" />
                    <span className="register_account">art authenticator</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
