import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import getCurrentUserArtworks from "../../data/currentUser/getCurrentUserArtworks";
import { AuthContext } from "../../context/AuthContext";
import { ArtworkExhibitionForm } from "./ArtworkExhibitionForm";
import { genreOptions } from "../../mockData/genreOptions";
import { categoryOptions } from "../../mockData/categoryOptions";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";

const initialState = {
  title: "",
  description: "",
  date: new Date().getTime(),
  genre: "",
  coverPhotoURL: null,
  category: null,
  author: null,
  artworks: null,
};

const exhibitionsRef = collection(db, "exhibitions");
const exhibitionsDocRef = doc(exhibitionsRef);

export const AddExhibitionForm = ({ onClose }) => {
  const [selectedArtworks, setSelectedArtworks] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [userArtworks, setUserArtworks] = useState(null);
  const [exhibitionData, setExhibitionData] = useState(initialState);
  const { currentExhibitionId } = useContext(ArtworkModalContext);

  const handleCreateExhibition = async (e) => {
    e.preventDefault();

    if (currentExhibitionId) {
      try {
        const existentExhibitionsDocRef = doc(
          db,
          "exhibitions",
          currentExhibitionId
        );

        await updateDoc(existentExhibitionsDocRef, {
          ...exhibitionData,
          title: exhibitionData.title,
          description: exhibitionData.description,
          genre: exhibitionData.genre.value,
          coverPhotoURL: exhibitionData.coverPhotoURL,
          category: exhibitionData.category.value,
          author: currentUser.uid,
          artworks: selectedArtworks,
        });

        // Clear form data and selected artworks
        setExhibitionData(initialState);
        setSelectedArtworks(null);
        onClose();
      } catch (error) {
        console.error("Error creating/updating exhibition", error);
      }
    } else {
      try {
        await setDoc(exhibitionsDocRef, {
          ...exhibitionData,
          title: exhibitionData.title,
          id: exhibitionsDocRef.id,
          description: exhibitionData.description,
          genre: exhibitionData.genre.value,
          coverPhotoURL: exhibitionData.coverPhotoURL,
          category: exhibitionData.category.value,
          author: currentUser.uid,
          artworks: selectedArtworks,
        });

        // Clear form data and selected artworks
        setExhibitionData(initialState);
        setSelectedArtworks(null);
        onClose();
      } catch (error) {
        console.error("Error creating/updating exhibition", error);
      }
    }
  };

  const handleChange = (e) => {
    setExhibitionData({ ...exhibitionData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = async (dropdownLabel, { label, value }) => {
    let updatedExhibitionData = { ...exhibitionData };
    if (dropdownLabel === "category") {
      switch (value) {
        case "prints":
          updatedExhibitionData.coverPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/art-gallery-da0fa.appspot.com/o/prints.svg?alt=media&token=d1c2cfce-db61-4508-8265-224c3dc7132e";

          break;
        case "paintings":
          updatedExhibitionData.coverPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/art-gallery-da0fa.appspot.com/o/prints.svg?alt=media&token=d1c2cfce-db61-4508-8265-224c3dc7132e";
          break;

        case "exhibitions":
          updatedExhibitionData.coverPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/art-gallery-da0fa.appspot.com/o/Exhibitions.svg?alt=media&token=9b87872f-4ae6-4e8e-ae33-5e1ec2f66672";
          break;

        case "sculptures":
          updatedExhibitionData.coverPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/art-gallery-da0fa.appspot.com/o/sculptures.svg?alt=media&token=0cf62eef-9228-445e-acf0-ad11226db886";
          break;

        default:
          updatedExhibitionData.coverPhotoURL =
            "https://firebasestorage.googleapis.com/v0/b/art-gallery-da0fa.appspot.com/o/traditional.svg?alt=media&token=fcb3a89a-cc22-46c8-8b40-a25a2880d3e4";
          break;
      }
    }

    setExhibitionData({
      ...exhibitionData,
      [dropdownLabel]: { label, value },
      coverPhotoURL: updatedExhibitionData.coverPhotoURL,
    });
  };

  //EDIT ARTWORK
  const editHandler = async () => {
    try {
      const docRef = doc(db, "exhibitions", currentExhibitionId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data, "data");
        setExhibitionData({
          ...data,
          genre: { label: data.genre, value: data.genre },
          category: { label: data.category, value: data.category },
        });

        if (data.artworks) {
          setSelectedArtworks(data.artworks);
        }
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (currentExhibitionId !== undefined && currentExhibitionId !== "") {
      editHandler();
    }
  }, [currentExhibitionId]);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(currentUser).length > 0) {
        const userArtworksData = await getCurrentUserArtworks(currentUser);
        const filteredArtworks = userArtworksData.filter(
          (art) => art.isAuthenticated === true
        );
        setUserArtworks(filteredArtworks);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <>
      <div className="exhibition-form-container">
        <form className="form" id="exhibition-form">
          <div className="inputs">
            <div className="input-item">
              <input
                type="text"
                id="title"
                value={exhibitionData.title}
                name="title"
                placeholder="title"
                onChange={handleChange}
              />
            </div>
            <div className="input-item">
              <input
                type="text"
                id="description"
                value={exhibitionData.description}
                name="description"
                placeholder="description"
                onChange={handleChange}
              />
            </div>
            <div className="art-details-types">
              <div className="input-item">
                <Select
                  styles={{ width: 400 }}
                  value={exhibitionData.genre}
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
                  value={exhibitionData.category}
                  placeholder="category"
                  onChange={({ label, value }) =>
                    handleDropdownChange("category", { label, value })
                  }
                  options={categoryOptions}
                  className="dropdown-input"
                />
              </div>
            </div>
            <div className="select_artworks"> select artworks </div>
            <div className="artworks_container">
              {userArtworks?.map((art) => {
                return (
                  <ArtworkExhibitionForm
                    art={art}
                    key={art.id}
                    selectedArtworks={selectedArtworks}
                    setSelectedArtworks={setSelectedArtworks}
                  />
                );
              })}
            </div>
          </div>

          <div className="buttons">
            <button id="cancel" name="cancel" onClick={onClose}>
              Cancel
            </button>

            <button
              id="publish"
              name="publish"
              onClick={handleCreateExhibition}
            >
              Create exhibition
            </button>
          </div>
          {/* {isLoading && (
            <div className="spinner">
              <ClipLoader size={30} aria-label="Loading Spinner" />
            </div>
          )} */}
        </form>
      </div>
    </>
  );
};
