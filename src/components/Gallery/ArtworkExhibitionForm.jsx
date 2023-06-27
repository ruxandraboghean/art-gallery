import React, { useEffect, useState } from "react";

export const ArtworkExhibitionForm = ({
  art,
  selectedArtworks,
  setSelectedArtworks,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (art) => {
    setIsChecked(!isChecked);
  };

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
  }, [isChecked, art]);

  return (
    <div>
      <input
        type="checkbox"
        className="artwork"
        onChange={() => handleCheckboxChange(art)}
      />
      <img src={art.photoURL} alt="art" className="artwork_photo"></img>
      {art.title}
    </div>
  );
};
