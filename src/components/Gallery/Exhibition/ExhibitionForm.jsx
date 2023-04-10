import React, { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { categoryOptions } from "../../../mockData/categoryOptions";

import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";

const initialState = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  year: "",
  description: "",
  status: "",
  coverPhotoURL: null,
  category: null,
};

export const ExhibitionForm = () => {
  const [exhibition, setExhibition] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  const isImageUploaded = exhibition?.coverPhotoURL !== null;

  function loadFile(e) {
    setExhibition({
      ...exhibition,
      coverPhotoURL: {
        imageSrc: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      },
    });
  }

  const handleRemoveImg = () => {
    setExhibition({
      ...exhibition,
      coverPhotoURL: null,
    });
  };

  const resetState = (e) => {
    e.preventDefault();
    setExhibition(initialState);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setExhibition({ ...exhibition, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const formattedDate = new Date(e.target.value).toISOString().slice(0, 10);
    setExhibition({
      ...exhibition,
      date: formattedDate,
    });
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setExhibition({ ...exhibition, [dropdownLabel]: { label, value } });
  };

  const handleSaveExhibition = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(collection(db, "exhibitions"));
      const exhibitionId = docRef.id;

      const storageRef = sRef(storage, exhibitionId);
      console.log("STORAGE: ", storageRef);

      if (exhibition?.coverPhotoURL?.imageSrc) {
        setIsLoading(true);

        await setDoc(docRef, {
          ...exhibition,
          id: exhibitionId,
          category: exhibition?.category.value,
          status: "draft",
          coverPhotoURL: exhibition?.coverPhotoURL?.imageSrc || "",
        });

        console.log(exhibition, "@after creating doc for exhib");
        await uploadBytesResumable(
          storageRef,
          exhibition?.coverPhotoURL?.file
        ).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "exhibitions", exhibitionId), {
                ...exhibition,
                coverPhotoURL: downloadURL,
              });

              console.log("Document written with ID: ", docRef.id);
              setIsLoading(false);

              setErr(false);
              resetState(e);
            } catch (err) {
              console.log("Can't update doc:", err.message);
              setErr(true);
            }
          });
        });
      }
    } catch (err) {
      console.log("Can't update doc:", err.message);
      setErr(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="artwork-form-container" id="exhibition-form-container">
        <div className="image-container">
          <div
            className={`upload-container ${
              isImageUploaded && "upload-container-none"
            }`}
          >
            <ImIcons.ImDownload className="drag-icon" />
            <p>Drag & Drop your artwork here.</p>
            <input
              type="file"
              id="upload-btn"
              accept="image/*"
              className="input-upload"
              onChange={loadFile}
            />
            <label htmlFor="upload-btn" className="upload-btn">
              Upload
            </label>
          </div>

          <div className="img-wrapper">
            {isImageUploaded && (
              <>
                <TiIcons.TiDelete
                  className="remove-icon"
                  onClick={handleRemoveImg}
                />
                <img
                  src={exhibition?.coverPhotoURL?.imageSrc}
                  className="img-uploaded"
                />
              </>
            )}
          </div>
        </div>
        <form className="form" id="exhibition-form">
          <div className="input-item">
            <label htmlFor="title">title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title"
              value={exhibition?.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="year">year</label>
            <input
              type="text"
              id="year"
              name="year"
              placeholder="year"
              value={exhibition?.year}
              className="exhibition-item"
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="description"
              value={exhibition?.description}
              className="exhibition-item"
              onChange={handleChange}
            />
          </div>
          <div className="art-details-types">
            <div className="input-item fit-content">
              <label htmlFor="date">date</label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="date"
                value={exhibition?.date}
                className="exhibition-item"
                onChange={handleDateChange}
              />
            </div>

            <div className="input-item fit-content">
              <label htmlFor="category"> category </label>
              <Select
                styles={{ width: 400 }}
                value={exhibition.category}
                onChange={({ label, value }) =>
                  handleDropdownChange("category", { label, value })
                }
                options={categoryOptions}
                className="dropdown-input"
              />
            </div>
          </div>

          <div className="buttons">
            <button className="cancel" name="cancel">
              Cancel
            </button>
            <button className="save" name="save" onClick={handleSaveExhibition}>
              Save
            </button>
            <button className="publish" name="publish">
              Publish
            </button>
          </div>
          {isLoading && (
            <div className="spinner">
              <ClipLoader size={30} aria-label="Loading Spinner" />
            </div>
          )}
          {err && <p className="error">You have to complete all fields</p>}
        </form>
      </div>
    </>
  );
};
