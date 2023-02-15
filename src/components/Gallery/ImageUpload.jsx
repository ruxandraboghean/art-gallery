import React, { useState } from "react";
import { useRef } from "react";
import * as ImIcons from "react-icons/im";
import * as FcIcons from "react-icons/fc";

export const ImageUpload = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const image = useRef();

  function loadFile(e) {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setIsImageUploaded(true);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const handleClick = () => {
    setIsImageUploaded(false);
    refreshPage();
  };

  return (
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
              onClick={handleClick}
            />
          </>
        )}
      </div>
    </div>
  );
};
