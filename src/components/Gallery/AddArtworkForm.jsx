import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ImIcons from "react-icons/im";
import * as FcIcons from "react-icons/fc";

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
import Select from 'react-select';

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

let genreOption = [
  { label: "abstract", value: "abstract" },
  { label: "boho", value: "boho" },
  { label: "moderm", value: "moderm" },
  { label: "romanticism", value: "romanticism" },
  { label: "realist", value: "realist" },
];

export const AddArtworkForm = () => {
  const [photo, setPhoto] = useState(null); // {imgSrc: "", file: ""}
  const [artworkData, setArtworkData] = useState(initialState);
  const { currentUser } = useContext(AuthContext);
  const params = useParams();

  // derrived state
  const isImageUploaded = photo !== null;

  function loadFile(e) {
    setPhoto({
      imageSrc: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    })
  }

  const resetState = (e) => {
    e.preventDefault();
    setArtworkData(initialState);
    setPhoto(null);
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
  }

  //SAVE AS DRAFT
  async function saveArtwork(e) {
    e.preventDefault();

    try {
      const artworkId = params.id;
      if (artworkId !== undefined && artworkId !== "") {
        const docRef = doc(db, "artworks", artworkId);
        console.log(docRef, "docRef");
        await updateDoc(docRef, {
          artworkInfo: {...artworkData, unit: artworkData?.value},
        });

        resetState();
      } else {
        const docRef = doc(collection(db, "artworks"));
        const artId = docRef.id;

        await setDoc(docRef, {
          id: artId,
          artworkInfo: {...artworkData, unit: artworkData?.value},
        });
        try {
          const storageRef = sRef(storage, artId);

          await uploadBytesResumable(storageRef, photo?.file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await updateDoc(doc(db, "artworks", artId), {
                  photoURL: downloadURL,
                  status: "draft",
                });
                await updateDoc(doc(db, "users", currentUser.uid), {
                  artworks: arrayUnion({
                    id: artId,
                    status: "draft",
                  }),
                });
              } catch (err) {
                console.log(err.message);
              }
            });
          });
        } catch { }

        resetState(e);
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //PUBLISH
  const publishArtwork = async () => {
    const docRef = doc(collection(db, "artworks"));
    const artId = docRef.id;

    try {
      await updateDoc(doc(db, "artworks", artId), {
        status: "published",
      });
      await updateDoc(doc(db, "users", currentUser.uid), {
        artworks: arrayUnion({
          status: "published",
        }),
      });
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
        setArtworkData(docSnap.data().artworkInfo);
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
      console.log(artworkData);
    }
  }, []);

  return (
    <div className="form-container">
      <div className="image-container">
        <div
          className={`upload-container ${isImageUploaded && "upload-container-none"
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

        <div>
          {isImageUploaded && (
            <>
              <img src={photo?.imageSrc} className="img-uploaded" />
              <FcIcons.FcRemoveImage
                className="remove-icon"
                onClick={handleRemoveImg}
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
              onChange={({ label, value }) => handleDropdownChange("unit", { label, value })}
              options={unitOptions}
            />

          </div>
        </div>
        <div className="art-details-types">
          <div className="input-item">
            <label htmlFor="technique">technique</label>
            <div>Dropdown placeholder</div>

          </div>
          <div className="input-item">
            <label htmlFor="genre">genre</label>
            <div>Dropdown placeholder</div>
          </div>
        </div>

        <div className="buttons">
          <button className="cancel" name="cancel" onClick={refreshPage}>
            Cancel
          </button>
          <button className="save" name="save" onClick={saveArtwork}>
            Save
          </button>
          <button className="publish" name="publish" onClick={publishArtwork}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};
