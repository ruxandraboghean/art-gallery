import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";

export const ArtworkExhibitionForm = ({
  art,
  selectedArtworks,
  setSelectedArtworks,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isEditExhibitionAction } = useContext(ArtworkModalContext);

  const handleCheckboxChange = (art) => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isEditExhibitionAction) {
      const isSelected = Object.keys(selectedArtworks)?.includes(art.id);
      isSelected && setIsChecked(true);
    }
  }, []);

  useEffect(() => {
    if (isChecked === true) {
      setSelectedArtworks((prevSelectedArtworks) => ({
        ...prevSelectedArtworks,
        [art.id]: art,
      }));
    } else if (isChecked === false) {
      setSelectedArtworks((prevSelectedArtworks) => {
        const updatedSelectedArtworks = { ...prevSelectedArtworks };
        delete updatedSelectedArtworks[art.id];
        return updatedSelectedArtworks;
      });
    }
  }, [isChecked, art.id]);

  console.log(selectedArtworks, "selected");
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        className="artwork"
        onChange={() => handleCheckboxChange(art)}
      />
      <img src={art.photoURL} alt="art" className="artwork_photo"></img>
      {art.title}
    </div>
  );
};
