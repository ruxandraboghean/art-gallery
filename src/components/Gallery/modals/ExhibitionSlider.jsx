import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillGithub } from "react-icons/ai";

export default function ExhibtionSlider({ artworks }) {
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

  return (
    <Slider {...settings}>
      {artworks.map((artwork, index) => (
        <div className="slider__item" key={artwork.id}>
          <span className="slider__title"> {artwork.title}</span>
          <img src={artwork.photoURL} alt={artwork.title} />
          <span className="slide__date"> {artwork.year}</span>
        </div>
      ))}
    </Slider>
  );
}
