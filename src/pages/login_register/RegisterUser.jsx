import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import ClipLoader from "react-spinners/ClipLoader";
import logo from "../../images/logo/no_illusion_logo.png";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { from } = location.state;

  console.log(from, "from");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    console.log(e.target, "target");
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const checkPassword = e.target[3].value;
    const file = e.target[4].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              role: from,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            setIsLoading(false);
            navigate("/login");
          } catch (err) {
            setErr(true);
          }
        });
      });
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
              <img src={logo} alt="Logo" className="register-logo" />
            </div>
            <div className="meter orange nostripes">
              <span></span>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <div className="input-icons-register">
                  <i className="fa fa-user"></i>
                  <input type="text" placeholder="username" />
                </div>
                <div className="input-icons-register">
                  <i className="fa fa-envelope"></i>
                  <input type="email" placeholder="email" />
                </div>
                <div className="input-icons-register">
                  <i className="fa fa-duotone fa-lock"></i>
                  <input type="password" placeholder="password" />
                </div>
                <div className="input-icons-register">
                  <i className="fa fa-duotone fa-lock"></i>
                  <input type="password" placeholder="confirm password" />
                </div>
              </div>
              <input style={{ display: "none" }} type="file" id="file" />
              <div className="upload-files">
                <label htmlFor="file">
                  <AddPhotoAlternateIcon className="add-avatar" />
                  <span> Add an avatar </span>
                </label>
              </div>
              <button className="form-button">
                <span className="text">Register</span>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="fa-circle-arrow-right"
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