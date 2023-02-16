import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState, useRef } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import * as ImIcons from "react-icons/im";
import * as FcIcons from "react-icons/fc";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const initialState = {
  title: "",
  year: "",
  description: "",
  height: "",
  width: "",
  depth: "",
  unit: "",
  tehnique: "",
  genre: "",
};

export const ArtworkForm = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const image = useRef();
  const [artworkData, setArtworkData] = useState(initialState);
  const [userArtworks, setUserArtworks] = useState(null);

  const handleChange = (e) => {
    setArtworkData({ ...artworkData, [e.target.name]: e.target.value });
  };

  const { currentUser } = useContext(AuthContext);

  function loadFile(e) {
    setPhoto(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setIsImageUploaded(true);
  }

  const resetState = (e) => {
    e.preventDefault();
    setArtworkData(initialState);
    setIsImageUploaded(false);
    setImageSrc(null);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    const getArtworks = () => {
      const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setUserArtworks(doc.data().artworks);
      });

      return () => {
        unSub();
      };
    };
    currentUser.uid && getArtworks();
  }, [currentUser.uid]);

  async function saveArtwork(e) {
    e.preventDefault();

    try {
      const docRef = doc(collection(db, "artworks"));
      const artId = docRef.id;

      await setDoc(docRef, {
        id: artId,
        artworkInfo: artworkData,
      });

      try {
        const storageRef = ref(storage, artId);

        await uploadBytesResumable(storageRef, photo).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "artworks", artId), {
                photoURL: downloadURL,
              });
              await updateDoc(doc(db, "users", currentUser.uid), {
                artworks: arrayUnion({
                  id: artId,
                  artworkInfo: artworkData,
                  photoURL: downloadURL,
                }),
              });
            } catch (err) {
              console.log(err.message);
            }
          });
        });
      } catch {}
      resetState(e);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleRemoveImg = () => {
    refreshPage();
  };

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

        <div>
          {isImageUploaded && (
            <>
              <img ref={image} src={imageSrc} className="img-uploaded" />
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
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="unit"
              value={artworkData?.unit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-item">
          <label htmlFor="tehnique">tehnique</label>
          <input
            type="text"
            id="tehnique"
            name="tehnique"
            placeholder="tehnique"
            value={artworkData?.tehnique}
            onChange={handleChange}
          />
        </div>
        <div className="input-item">
          <label htmlFor="genre">genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="genre"
            value={artworkData?.genre}
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button className="cancel" name="cancel" onClick={refreshPage}>
            Cancel
          </button>
          <button className="save" name="save" onClick={saveArtwork}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
