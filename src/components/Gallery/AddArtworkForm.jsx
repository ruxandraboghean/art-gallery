import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";

// firebase
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
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
  date: null,
};

let unitOptions = [
  { label: "cm", value: "cm" },
  { label: "inch", value: "inch" },
];

let techniqueOptions = [
  { label: "acrylic", value: "acrylic" },
  { label: "oil", value: "oil" },
  { label: "watercolor", value: "watercolor" },
  { label: "sculpture", value: "sculpture" },
  { label: "digital art", value: "digital art" },
];

let genreOptions = [
  { label: "abstract", value: "abstract" },
  { label: "boho", value: "boho" },
  { label: "modern", value: "modern" },
  { label: "romanticism", value: "romanticism" },
  { label: "realist", value: "realist" },
];

export const AddArtworkForm = () => {
  const [artworkData, setArtworkData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
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
      console.log();

      const artworkId = params.id;
      if (artworkId !== undefined && artworkId !== "") {
        const docRef = doc(db, "artworks", artworkId);
        await updateDoc(docRef, {
          ...artworkData,
          unit: artworkData?.unit.value,
          technique: artworkData?.technique.value,
          genre: artworkData?.genre.value,
        });

        resetState(e);
      } else {
        const docRef = doc(collection(db, "artworks"));
        const artId = docRef.id;

        await setDoc(docRef, {
          ...artworkData,
          id: artId,
          unit: artworkData?.unit.value,
          technique: artworkData?.technique.value,
          genre: artworkData?.genre.value,
          status: "draft",
          photoURL: "",
          date: serverTimestamp(),
        });
        try {
          const storageRef = sRef(storage, artId);
          console.log("PHOTO:", artworkData.photoURL.file);

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
                    photoURL: downloadURL,
                    status: "draft",
                  }),
                });
              } catch (err) {
                console.log("Can't update doc:", err.message);
              }
            });
          });
        } catch (err) {
          console.log("Can't update doc:", err.message);
        }

        resetState(e);
        console.log("Document written with ID: ", docRef.id);
      }
      setIsLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //PUBLISH
  const publishArtwork = async () => {
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
    <div className="form-container">
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
      <form className="form">
        <div className="input-item">
          <label htmlFor="title">title</label>
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
          <label htmlFor="year">year</label>
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
          <label htmlFor="description">description</label>
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
            <label htmlFor="height">height</label>
            <input
              type="text"
              id="height  "
              name="height"
              placeholder="height"
              value={artworkData?.height}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="width">width</label>
            <input
              type="text"
              id="width"
              name="width"
              placeholder="width"
              value={artworkData?.width}
              onChange={handleChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="depth">depth</label>
            <input
              type="text"
              id="depth"
              name="depth"
              placeholder="depth"
              value={artworkData?.depth}
              onChange={handleChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="unit">unit</label>
            <Select
              styles={{ width: 400 }}
              value={artworkData.unit}
              onChange={({ label, value }) =>
                handleDropdownChange("unit", { label, value })
              }
              options={unitOptions}
              className="dropdown-input"
            />
          </div>
        </div>
        <div className="art-details-types">
          <div className="input-item">
            <label htmlFor="technique">technique</label>
            <Select
              styles={{ width: 400 }}
              value={artworkData.technique}
              onChange={({ label, value }) =>
                handleDropdownChange("technique", { label, value })
              }
              options={techniqueOptions}
              className="dropdown-input"
            />
          </div>
          <div className="input-item">
            <label htmlFor="genre">genre</label>
            <Select
              styles={{ width: 400 }}
              value={artworkData.genre}
              onChange={({ label, value }) =>
                handleDropdownChange("genre", { label, value })
              }
              options={genreOptions}
              className="dropdown-input"
            />
          </div>
        </div>

        <div className="buttons">
          <button className="cancel" name="cancel" onClick={refreshPage}>
            Cancel
          </button>
          <button className="save" name="save" onClick={handleSaveArtwork}>
            Save
          </button>
          <button className="publish" name="publish" onClick={publishArtwork}>
            Publish
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
