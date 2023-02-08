import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import logo from "../images/logo-default.png";
import add from "../images/add.png";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkPassword = e.target[3].value;
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
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
          } catch (err) {
            setErr(true);
          }
        });
      });
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
          <div className="meter orange nostripes">
            <span></span>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <div className="input-icons">
                <i className="fa fa-user"></i>
                <input type="text" placeholder="username" />
              </div>
              <div className="input-icons">
                <i className="fa fa-envelope"></i>
                <input type="email" placeholder="email" />
              </div>
              <div className="input-icons">
                <i className="fa fa-duotone fa-lock"></i>
                <input type="password" placeholder="password" />
              </div>
              <div className="input-icons">
                <i className="fa fa-duotone fa-lock"></i>
                <input type="password" placeholder="confirm password" />
              </div>
            </div>
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={add} alt="Add" />
              <span> Add an avatar </span>
            </label>
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
