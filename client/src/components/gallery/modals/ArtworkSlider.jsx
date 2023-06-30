import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useState } from "react";
import getUserById from "../../../data/users/getUserById";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function ArtworkSlider({ artwork, onClose }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    style: {
      maxWidth: "80%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: "2rem",
      height: "80%",
      backgroundColor: "$base_color_pink",
      color: "var(--secondary-color)",
      borderRadius: "5px",
    },
  };
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      const authorData = await getUserById(artwork.userId);

      setAuthor(authorData);
    };

    getAuthor();
  });

  return (
    <>
      <button className="close" onClick={onClose}>
        <AiOutlineCloseCircle className="close_circle" />
      </button>
      <Slider {...settings}>
        <div className="slider__item">
          <span className="slider__title"> {artwork.title}</span>
          <img src={artwork.photoURL} alt={artwork.title} />
          <span className="slide__date"> {artwork.year}</span>
        </div>
        <div className="slider__item">
          <div className="certified_art_informations">
            <div className="about_artist">
              <div className="about_artist_header">
                <img
                  src={author?.photoURL}
                  alt="avatar"
                  className="current-user"
                />
                <span className="author_name">{author?.displayName}</span>
              </div>
            </div>
            <div className="certified_art_content">
              <div className="technical_details_wrapper no_border">
                <span className="certified_art_header"> About the work</span>
                <span>{artwork.description}</span>
              </div>
              <div className="technical_details_wrapper no_border">
                <span className="certified_art_header"> Technical Details</span>
                <span className="certified_art_technical_details">
                  depth: {artwork.depth} {artwork.unit}
                </span>
                <span className="certified_art_technical_details">
                  height:{artwork.height} {artwork.unit}
                </span>
                <span className="certified_art_technical_details">
                  width: {artwork.width} {artwork.unit}
                </span>
              </div>
              <div className="technical_details_wrapper no_border grid_item_full">
                <span className="certified_art_header"> Characteristics</span>

                <span>Category: {artwork.category}</span>

                <span>Genre: {artwork.genre}</span>
                <span>Technique: {artwork.technique}</span>
              </div>
              <span className="slider__title">{author?.displayName}</span>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}
