import React, { useEffect } from "react";
import { useState } from "react";
import getUserById from "../../../data/users/getUserById";
import moment from "moment";

export const CardExhibition = ({
  exhibition,
  setIsOpenExhibitionModal,
  setCurrentExpo,
}) => {
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);
  const handleSeeExhibition = () => {
    setIsOpenExhibitionModal(true);
  };

  function formatDate(date) {
    const dateFormatted = moment(exhibition.date).format("MMMM DD, YYYY");
    setDate(dateFormatted);
  }
  useEffect(() => {
    const getAuthorName = async () => {
      const authorData = await getUserById(exhibition.author);
      setAuthor(authorData.displayName);
    };
    getAuthorName();
    setCurrentExpo(exhibition);
    formatDate();
  }, []);

  return (
    <div className="exhibition-card-wrapper">
      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url(${exhibition.coverPhotoURL})`,
        }}
      >
        <span className="see-exhibition" onClick={handleSeeExhibition}>
          see expo
        </span>
        <div className="info-wrapper">
          <div className="profile-info">
            <div> {date} </div>
            <span> {author} </span>
          </div>
          <div>
            <span>{exhibition.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
