import React, { useContext, useState, useEffect } from "react";
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
import { useDropzone } from "react-dropzone";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import getSpecialists from "../../data/getSpecialists";

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
  specialist: null,
};

const artworksRef = collection(db, "artworks");
const artworksDocRef = doc(artworksRef);
const artId = artworksDocRef.id;

export const AddArtworkForm = ({ onClose }) => {
  const [artworkData, setArtworkData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const {
    artworkId,
    setIsSuccess,
    setHasDisplayedMessage,
    setArtworks,
    setUserArtworks,
  } = useContext(ArtworkModalContext);

  const [specialistOptions, setSpecialistsOptions] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setArtworkData({
      ...artworkData,
      photoURL: {
        imageSrc: URL.createObjectURL(selectedFile),
        file: selectedFile,
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  const handleRemoveImg = () => {
    setArtworkData({ ...artworkData, photoURL: null });
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

  const getSpecialistsData = async () => {
    const specialistsData = await getSpecialists();
    setSpecialistsOptions(
      specialistsData.map((specialist) => ({
        label: specialist.displayName,
        value: specialist.displayName,
      }))
    );
  };

  const saveNewArtwork = async (e, status) => {
    try {
      const storageRef = sRef(storage, artId);

      if (artworkData?.photoURL?.imageSrc) {
        await setDoc(artworksDocRef, {
          ...artworkData,
          id: artId,
          unit: artworkData?.unit.value,
          technique: artworkData?.technique.value,
          genre: artworkData?.genre.value,
          category: artworkData?.category.value,
          specialist: artworkData?.specialist.value,
          status: status,
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
                unit: artworkData?.unit.value,
                technique: artworkData?.technique.value,
                genre: artworkData?.genre.value,
                category: artworkData?.category.value,
                specialist: artworkData?.specialist.value,
                status: status,
              });
              await updateDoc(doc(db, "users", currentUser.uid), {
                artworks: arrayUnion({
                  id: artId,
                }),
                notifications: arrayUnion({
                  message: `Art added successfully. You can see now in you artworks with "${status}" status. 
                  Wait for the expert ${artworkData.specialist.value} report`,
                  time: new Date().getTime(),
                  image: downloadURL,
                }),
              });
              console.log("Document written with ID: ", artId);

              setErr(false);
              resetState(e);
              setIsSuccess(true);

              setArtworks((prevArtworks) =>
                prevArtworks.concat({
                  id: artId,
                  ...artworkData,
                  unit: artworkData?.unit.value,
                  technique: artworkData?.technique.value,
                  genre: artworkData?.genre.value,
                  category: artworkData?.category.value,
                  specialist: artworkData?.specialist.value,
                  photoURL: downloadURL,
                  status: status,
                })
              );
              onClose();
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
  };
  //SAVE AS DRAFT
  async function handleSaveAsDraft(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      //doc ref user artworks

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const artworks = userDoc.data().artworks;

      //if artwork exists
      if (artworkId) {
        setHasDisplayedMessage(false);

        const docRef = doc(db, "artworks", artworkId);

        //update la artwork existent in firebase

        await updateDoc(docRef, {
          ...artworkData,
          unit: artworkData?.unit.value,
          technique: artworkData?.technique.value,
          genre: artworkData?.genre.value,
          category: artworkData?.category.value,
          specialist: artworkData?.specialist.value,
          photoURL: artworkData?.photoURL.imageSrc,
          status: artworkData?.status,
        });

        //seteaza in view imediat artwork ul editat

        const index = artworks.findIndex((artwork) => artwork.id === artworkId);

        if (index !== -1) {
          let updatedArtworks = [...artworks];

          updatedArtworks[index] = {
            id: artworkId,
          };

          await updateDoc(userDocRef, { artworks: updatedArtworks });
          setUserArtworks(updatedArtworks);
        }

        resetState(e);
        setErr(false);
        setIsSuccess(true);

        onClose();

        console.log("Document updated with ID: ", docRef.id);
      } else {
        saveNewArtwork(e, "draft");
      }
      setIsLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //SEND REQUEST TO SPECIALIST
  const sendRequest = async (e) => {
    e.preventDefault();

    if (artworkId) {
      try {
        setIsLoading(true);

        const docRef = doc(db, "artworks", artworkId);
        await updateDoc(docRef, {
          ...artworkData,
          unit: artworkData?.unit.value,
          technique: artworkData?.technique.value,
          genre: artworkData?.genre.value,
          category: artworkData?.category.value,
          specialist: artworkData?.specialist.value,
          photoURL: artworkData?.photoURL.imageSrc,
          status: "pending authentication",
        });

        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const artworks = userDoc.data().artworks;

        const index = artworks.findIndex((artwork) => artwork.id === artworkId);

        if (index !== -1) {
          let updatedArtworks = [...artworks];

          updatedArtworks[index] = {
            id: artworkId,
          };

          await updateDoc(userDocRef, { artworks: updatedArtworks });
          setArtworks(updatedArtworks);
        }

        setIsLoading(false);
        setIsSuccess(true);

        onClose();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      saveNewArtwork(e, "pending authentication");
    }
  };

  //EDIT ARTWORK
  const editHandler = async () => {
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
          specialist: { label: data.specialist, value: data.specialist },
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
    if (artworkId !== undefined && artworkId !== "") {
      editHandler();
      getSpecialistsData();
    }
  }, [artworkId]);

  return (
    <>
      <div className="artwork-form-container">
        <div className="image-container">
          <div
            className={`upload-container ${
              isImageUploaded && "upload-container-none"
            }`}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              multiple={false}
              type="file"
              id="upload-btn"
              accept="image/*"
              className="input-upload"
              onChange={loadFile}
            />
            <label htmlFor="upload-btn">
              <ImIcons.ImDownload className="drag-icon" />
            </label>

            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag & drop image </p>
            )}
          </div>

          <div className={`img-wrapper ${!isImageUploaded && "image-none"}`}>
            {isImageUploaded && (
              <>
                <TiIcons.TiDelete
                  className="remove-icon"
                  onClick={handleRemoveImg}
                />
                <img
                  src={artworkData?.photoURL?.imageSrc}
                  alt="artwork"
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
              <label htmlFor="certificate">has certificate</label>
            </div>
            {!isChecked && (
              <div className="input-item">
                <Select
                  styles={{ width: 400 }}
                  value={artworkData.specialist}
                  placeholder="art authenticator"
                  onChange={({ label, value }) =>
                    handleDropdownChange("specialist", { label, value })
                  }
                  options={specialistOptions}
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
            <button id="save" name="save" onClick={handleSaveAsDraft}>
              Save as draft
            </button>
            <button id="publish" name="publish" onClick={sendRequest}>
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
    </>
  );
};
