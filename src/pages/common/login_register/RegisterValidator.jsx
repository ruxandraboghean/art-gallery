import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { auth, db, storage } from "../../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import ClipLoader from "react-spinners/ClipLoader";
import logo from "../../../images/logo/no_illusion_logo.png";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachmentIcon from "@mui/icons-material/Attachment";

import { AiOutlineCloseCircle } from "react-icons/ai";

export const RegisterValidator = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    checkPassword: "",
    file: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { from } = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  function extractFileName(filePath) {
    var startIndex =
      filePath.indexOf("\\") >= 0
        ? filePath.lastIndexOf("\\")
        : filePath.lastIndexOf("/");
    var fileName = filePath.substring(startIndex);

    if (fileName.indexOf("\\") === 0 || fileName.indexOf("/") === 0) {
      fileName = fileName.substring(1);
    }

    return fileName;
  }

  const handleRemove = (file) => {
    if (file === "file") {
      setFormValues({ ...formValues, file: null });
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkPassword = e.target[3].value;
    const file = e.target[4].files[0] || null;

    console.log(file, "file");

    if (
      !formValues.username.trim() ||
      !formValues.email.trim() ||
      !formValues.password.trim() ||
      !formValues.checkPassword.trim() ||
      !formValues.file.trim()
    ) {
      alert("Please complete all required fields.");
      setIsLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRefFile = ref(storage, displayName);

        await uploadBytesResumable(storageRefFile, file).then(() => {
          getDownloadURL(storageRefFile).then(async (downloadURL) => {
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
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-icons-register">
                  <i className="fa fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-icons-register">
                  <i className="fa fa-duotone fa-lock"></i>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-icons-register">
                  <i className="fa fa-duotone fa-lock"></i>
                  <input
                    type="password"
                    placeholder="confirm password"
                    name="checkPassword"
                    value={formValues.checkPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="upload-files">
                <label htmlFor="file">
                  <AddPhotoAlternateIcon className="add-avatar" />
                  <span> Add an avatar </span>
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg, .png, .svg"
                  name="file"
                  id="file"
                  value={formValues.file}
                  onChange={handleChange}
                />
              </div>
              {formValues?.file && (
                <div className="file_displayed">
                  {extractFileName(formValues?.file)}
                  <AiOutlineCloseCircle
                    className="close_button"
                    onClick={() => handleRemove("file")}
                  />
                </div>
              )}

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
