import React from 'react';
import { Link } from 'react-router-dom';

import logo from "../images/logo/no_illusion_logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export const RegisterExpert = () => {
  return (
    <>
      <div className="form-container">
            <div className="form-wrapper">
                <div className="center">
                    <img src={logo} alt="Logo" className="register-logo" />
                </div>
            </div>
        </div>
    </>
  )
}
