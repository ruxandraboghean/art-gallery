import React, { useContext, useState, useEffect } from "react";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
import getSpecialists from "../../data/users/getSpecialists";
import getUsers from "../../data/users/getUsers";
import RequestStatusEnum from "../../enums/RequestStatusEnum";

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
  specialist: "",
  userId: null,
  certificateURL: "",
  reportURL: "",
  isAuthenticated: false,
};

const artworksRef = collection(db, "artworks");
const requestsRef = collection(db, "requests");
const artworksDocRef = doc(artworksRef);
const requestsDocRef = doc(requestsRef);
const artId = artworksDocRef.id;

export const AddArtworkForm = ({ onClose }) => {
  const [artworkData, setArtworkData] = useState(initialState);
  const [specialistSelected, setSpecialistSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [certificateFile, setCertificateFile] = useState(null);
  const {
    artworkId,
    setIsSuccess,
    setHasDisplayedMessage,
    setArtworks,
    setUserArtworks,
    setHasNewNotification,
    editable,
    legalValidator,
  } = useContext(ArtworkModalContext);

  const [specialistOptions, setSpecialistsOptions] = useState(null);
  const { nanoid } = require("nanoid");

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
  const resetState = (e) => {
    e.preventDefault();
    setArtworkData(initialState);
  };

  const handleRemoveImg = () => {
    setArtworkData({ ...artworkData, photoURL: null });
  };
  const handleRemove = (file) => {
    setArtworkData({ ...artworkData, certificateURL: null });
    setCertificateFile(null);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setArtworkData((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const handleDropdownChange = async (dropdownLabel, { label, value }) => {
    setArtworkData({ ...artworkData, [dropdownLabel]: { label, value } });

    if (dropdownLabel === "specialist") {
      const users = await getUsers();

      if (value) {
        const userSelected =
          users.find((user) => user.displayName === value.toLowerCase()) || {};
        setSpecialistSelected(userSelected);
      } else {
        setSpecialistSelected("");
      }
    }
  };
  const getSpecialistsData = async () => {
    const specialistsData = await getSpecialists();
    setSpecialistsOptions(
      specialistsData.map((specialist) => ({
        label:
          specialist.displayName.charAt(0).toUpperCase() +
          specialist.displayName.slice(1),
        value:
          specialist.displayName.charAt(0).toUpperCase() +
          specialist.displayName.slice(1),
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
          specialist: artworkData?.specialist.value || "",
          status: status,
          photoURL: artworkData?.photoURL?.imageSrc || "",
          userId: currentUser.uid,
        });

        if (specialistSelected === "") {
          console.log(legalValidator, "legalV");

          await setDoc(requestsDocRef, {
            id: requestsDocRef.id,
            initiator: currentUser.uid,
            receiver: legalValidator.uid,
            date: new Date().getTime(),
            artworkId: artId,
            status: RequestStatusEnum.PENDING,
          });
        } else {
          await setDoc(requestsDocRef, {
            id: requestsDocRef.id,
            initiator: currentUser.uid,
            receiver: specialistSelected.uid,
            date: new Date().getTime(),
            artworkId: artId,
            status: RequestStatusEnum.PENDING,
          });
        }

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
                specialist: artworkData?.specialist.value || "",
                status: status,
                userId: currentUser.uid,
              });
              await updateDoc(doc(db, "users", currentUser.uid), {
                artworks: arrayUnion({
                  id: artId,
                }),
                notifications: arrayUnion({
                  id: nanoid(),
                  message: `You can see now your art: ${artworkData.title} in your artworks with ${status} status. 
                  Wait for the expert ${artworkData.specialist.value} report`,
                  time: new Date().getTime(),
                  image: downloadURL,
                }),
              });
              if (specialistSelected !== "") {
                await updateDoc(doc(db, "users", specialistSelected.uid), {
                  notifications: arrayUnion({
                    id: nanoid(),
                    message: `You have a new request for authenticating the artwork: ${artworkData.title} of ${currentUser.displayName}. 
                  You can deny or accept the request.`,
                    time: new Date().getTime(),
                    image: downloadURL,
                  }),

                  requests: arrayUnion({
                    id: requestsDocRef.id,
                  }),
                });
              }
              console.log("Document written with ID: ", artId);

              setErr(false);
              resetState(e);
              setIsSuccess(true);
              setHasNewNotification(true);

              setArtworks((prevArtworks) =>
                prevArtworks.concat({
                  id: artId,
                  ...artworkData,
                  unit: artworkData?.unit.value,
                  technique: artworkData?.technique.value,
                  genre: artworkData?.genre.value,
                  category: artworkData?.category.value,
                  specialist: artworkData?.specialist.value || "",
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
          specialist: artworkData?.specialist.value || " ",
          photoURL: artworkData?.photoURL.imageSrc,
          status: artworkData?.status,
          userId: currentUser.uid,
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
        setHasNewNotification(true);
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
          specialist: artworkData?.specialist.value || "",
          photoURL: artworkData?.photoURL.imageSrc,
          status: "pending request",
          userId: currentUser.uid,
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
        setHasNewNotification(true);

        onClose();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      saveNewArtwork(e, "pending request");
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
                readOnly={!editable}
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
                readOnly={!editable}
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
                readOnly={!editable}
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
                  readOnly={!editable}
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
                  readOnly={!editable}
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
                  readOnly={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
                  options={categoryOptions}
                  className="dropdown-input"
                  data-testid="category-select"
                />
              </div>
            </div>
            <div className="input-item-checkbox">
              <input
                type="checkbox"
                id="certificate"
                checked={isChecked}
                onChange={handleCheckboxChange}
                readOnly={!editable}
              />
              <label htmlFor="certificate">has certificate</label>
            </div>
            {!isChecked && (
              <div className="input-item">
                <Select
                  styles={{ width: 400 }}
                  value={artworkData.specialist || ""}
                  placeholder="art authenticator"
                  onChange={({ label, value }) =>
                    handleDropdownChange("specialist", { label, value })
                  }
                  disabled={!editable}
                  options={specialistOptions}
                  className="dropdown-input"
                />
              </div>
            )}
            {isChecked && (
              <div className="input-item dropdown-input">
                <label
                  htmlFor="certificateUpload"
                  className="custom-file-upload"
                >
                  <span>
                    <i className="fa fa-cloud-upload" /> upload Certificate
                  </span>
                </label>
                <input
                  type="file"
                  id="certificateUpload"
                  name="certificateUpload"
                  accept=".pdf, .doc, .docx"
                  style={{ display: "none" }}
                  value={artworkData?.certificateURL}
                  onChange={(e) => {
                    handleChange(e);
                    setCertificateFile(e.target.value);
                  }}
                />
              </div>
            )}

            {certificateFile && (
              <div className="file_displayed">
                {extractFileName(certificateFile)}
                <AiOutlineCloseCircle
                  className="close_button"
                  onClick={() => handleRemove("certificate")}
                />
              </div>
            )}

            {err && <p className="error">You have to upload an image</p>}
          </div>
          <div className="buttons">
            <button id="cancel" name="cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              id="save"
              name="save"
              disabled={!editable}
              className={editable ? "" : "gray-bg"}
              onClick={handleSaveAsDraft}
            >
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
