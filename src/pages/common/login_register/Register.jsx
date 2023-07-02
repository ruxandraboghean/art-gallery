import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo/no_illusion_logo.png";
import user from "../../../images/user.png";
import expert from "../../../images/verified-account.png";
import validator from "../../../images/legal_validator.png";

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
                  </div>
                  <span className="register_account">user</span>
                </Link>
                <Link
                  to="/register-expert"
                  state={{ from: "expert" }}
                  className="arrow-right"
                >
                  <div className="user">
                    <img src={expert} alt="expert" className="expert_icon" />
                  </div>
                  <span className="register_account">specialist</span>
                </Link>
                <Link
                  to="/register-validator"
                  state={{ from: "validator" }}
                  className="arrow-right"
                >
                  <div className="user">
                    <img src={validator} alt="expert" className="expert_icon" />
                  </div>
                  <span className="register_account">validator</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
