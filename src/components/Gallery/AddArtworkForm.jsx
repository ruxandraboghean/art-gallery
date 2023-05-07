import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";

import { unitOptions } from "../../mockData/unitOptions";
import { techniqueOptions } from "../../mockData/techniqueOptions";
import { genreOptions } from "../../mockData/genreOptions";
import { categoryOptions } from "../../mockData/categoryOptions";

// firebase
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";

// components
import Select from "react-select";
import { ClipLoader } from "react-spinners";

const initialState = {
  title: "",
  year: "",
  description: "",
  height: "",
  width: "",
  depth: "",
  unit: null,
  technique: null,
  genre: null,
  status: "",
  photoURL: null,
  category: null,
};

export const AddArtworkForm = ({ onClose }) => {
  const [artworkData, setArtworkData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  // derrived state
  const isImageUploaded = artworkData?.photoURL !== null;

  function loadFile(e) {
    setArtworkData({
      ...artworkData,
      photoURL: {
        imageSrc: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      },
    });
  }

  const resetState = (e) => {
    e.preventDefault();
    setArtworkData(initialState);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleRemoveImg = () => {
    refreshPage();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (e) => {
    setArtworkData({ ...artworkData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setArtworkData({ ...artworkData, [dropdownLabel]: { label, value } });
  };

  //SAVE AS DRAFT
  async function handleSaveArtwork(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const artworkId = params.id;
      const docRef = doc(collection(db, "artworks"));
      const artId = docRef.id;

      if (artworkId !== undefined && artworkId !== "") {
        const docRef = doc(db, "artworks", artworkId);
        await updateDoc(docRef, {
          ...artworkData,
          unit: artworkData?.unit.value,
          technique: artworkData?.technique.value,
          genre: artworkData?.genre.value,
          category: artworkData?.category.value,
          photoURL: artworkData?.photoURL.imageSrc,
        });

        await updateDoc(doc(db, "users", currentUser.uid), {
          artworks: arrayUnion({
            ...artworkData,
            unit: artworkData?.unit.value,
            technique: artworkData?.technique.value,
            genre: artworkData?.genre.value,
            category: artworkData?.category.value,
            photoURL: artworkData?.photoURL.imageSrc,
          }),
        });

        resetState(e);
        setErr(false);
        console.log("Document written with ID: ", docRef.id);
        navigate("/");
      } else {
        try {
          const storageRef = sRef(storage, artId);
          console.log("STORAGE: ", storageRef);

          if (artworkData?.photoURL?.imageSrc) {
            await setDoc(docRef, {
              ...artworkData,
              id: artId,
              unit: artworkData?.unit.value,
              technique: artworkData?.technique.value,
              genre: artworkData?.genre.value,
              category: artworkData?.category.value,
              status: "draft",
              photoURL: artworkData?.photoURL?.imageSrc || "",
            });

            await uploadBytesResumable(
              storageRef,
              artworkData?.photoURL?.file
            ).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  await updateDoc(doc(db, "artworks", artId), {
                    ...artworkData,
                    photoURL: downloadURL,
                  });
                  await updateDoc(doc(db, "users", currentUser.uid), {
                    artworks: arrayUnion({
                      id: artId,
                      ...artworkData,
                      unit: artworkData?.unit.value,
                      technique: artworkData?.technique.value,
                      genre: artworkData?.genre.value,
                      category: artworkData?.category.value,
                      photoURL: downloadURL,
                      status: "draft",
                    }),
                  });
                  console.log("Document written with ID: ", docRef.id);
                  navigate("/gallery");

                  setErr(false);
                  resetState(e);
                } catch (err) {
                  console.log("Can't update doc:", err.message);
                  setErr(true);
                }
              });
            });
          } else {
            setErr(true);
          }
        } catch (err) {
          console.log("Can't update doc:", err.message);
          setErr(true);
        }
      }
      setIsLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //PUBLISH
  const publishArtwork = async (e) => {
    e.preventDefault();
    const docRef = doc(collection(db, "artworks"));
    const artId = docRef.id;

    try {
      setIsLoading(true);
      await updateDoc(doc(db, "artworks", artId), {
        status: "published",
      });
      await updateDoc(doc(db, "users", currentUser.uid), {
        artworks: arrayUnion({
          status: "published",
        }),
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  //EDIT ARTWORK
  const editHandler = async () => {
    const artworkId = params.id;
    try {
      const docRef = doc(db, "artworks", artworkId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setArtworkData({
          ...data,
          unit: { label: data.unit, value: data.unit },
          technique: { label: data.technique, value: data.technique },
          genre: { label: data.genre, value: data.genre },
          category: { label: data.category, value: data.category },
          photoURL: {
            imageSrc: data.photoURL,
            file: data.photoURL,
          },
        });
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const artworkId = params.id;
    if (artworkId !== undefined && artworkId !== "") {
      editHandler();
    }
  }, [params.id]);

  return (
    <div className="artwork-form-container">
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
            Upload{" "}
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
                src={artworkData?.photoURL?.imageSrc}
                className="img-uploaded"
              />
            </>
          )}
        </div>
      </div>
      <form className="form" id="exhibition-form">
        <div className="inputs">
          <div className="input-item">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title"
              value={artworkData?.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <input
              type="text"
              id="year"
              name="year"
              placeholder="year"
              value={artworkData?.year}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <input
              type="text"
              id="description"
              name="description"
              placeholder="description"
              value={artworkData?.description}
              onChange={handleChange}
            />
          </div>
          <div className="art-details">
            <div className="input-item">
              <input
                type="number"
                id="height  "
                name="height"
                placeholder="height"
                value={artworkData?.height}
                onChange={handleChange}
              />
            </div>
            <div className="input-item">
              <input
                type="number"
                id="width"
                name="width"
                placeholder="width"
                value={artworkData?.width}
                onChange={handleChange}
              />
            </div>
            <div className="input-item">
              <input
                type="number"
                id="depth"
                name="depth"
                placeholder="depth"
                value={artworkData?.depth}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="art-details-types">
            <div className="input-item">
              <Select
                styles={{ width: 400 }}
                value={artworkData.unit}
                placeholder="unit"
                onChange={({ label, value }) =>
                  handleDropdownChange("unit", { label, value })
                }
                options={unitOptions}
                className="dropdown-input"
              />
            </div>
            <div className="input-item">
              <Select
                styles={{ width: 400 }}
                value={artworkData.technique}
                placeholder="technique"
                onChange={({ label, value }) =>
                  handleDropdownChange("technique", { label, value })
                }
                options={techniqueOptions}
                className="dropdown-input"
              />
            </div>
          </div>
          <div className="art-details-types">
            <div className="input-item">
              <Select
                styles={{ width: 400 }}
                value={artworkData.genre}
                placeholder="genre"
                onChange={({ label, value }) =>
                  handleDropdownChange("genre", { label, value })
                }
                options={genreOptions}
                className="dropdown-input"
              />
            </div>

            <div className="input-item">
              <Select
                styles={{ width: 400 }}
                value={artworkData.category}
                placeholder="category"
                onChange={({ label, value }) =>
                  handleDropdownChange("category", { label, value })
                }
                options={categoryOptions}
                className="dropdown-input"
              />
            </div>
          </div>
          <div className="input-item-checkbox">
            <input
              type="checkbox"
              id="certificate"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label for="certificate">has certificate</label>
          </div>
          {!isChecked && (
            <div className="input-item">
              <Select
                styles={{ width: 400 }}
                value={artworkData.genre}
                placeholder="art authenticator"
                onChange={({ label, value }) =>
                  handleDropdownChange("genre", { label, value })
                }
                options={genreOptions}
                className="dropdown-input"
              />
            </div>
          )}
          {isChecked && (
            <div className="input-item dropdown-input">
              <label htmlFor="upload-btn" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i> upload certificate
              </label>
              <input
                type="file"
                id="upload-btn"
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          )}
          {err && <p className="error">You have to upload an image</p>}
        </div>
        <div className="buttons">
          <button id="cancel" name="cancel" onClick={onClose}>
            Cancel
          </button>
          <button id="save" name="save" onClick={handleSaveArtwork}>
            Save as draft
          </button>
          <button className="publish" name="publish" onClick={publishArtwork}>
            Send Request
          </button>
        </div>
        {isLoading && (
          <div className="spinner">
            <ClipLoader size={30} aria-label="Loading Spinner" />
          </div>
        )}
      </form>
    </div>
  );
};
