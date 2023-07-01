import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useState } from "react";
import getUserById from "../../../data/users/getUserById";

export default function UserSlider({ user }) {
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
      const authorData = await getUserById(user.userId);

      setAuthor(authorData);
    };

    getAuthor();
  });

  return (
    <Slider {...settings}>
      <div className="slider__item">
        <span className="slider__title"> {user.displayName}</span>
        <img src={user.photoURL} alt={user.title} />
        <span className="slider__title"> {user.role}</span>
      </div>
      <div className="slider__item">
        <div className="certified_art_informations">
          <div className="about_artist">
            <div className="about_artist_header">
              <img src={user?.photoURL} alt="avatar" className="current-user" />
              <span className="author_name">{author?.displayName}</span>
            </div>
          </div>
          <div className="certified_art_content">
            <div className="technical_details_wrapper no_border">
              <span className="certified_art_header"> About me</span>
              <span>{user.biography}</span>
            </div>
            <div className="technical_details_wrapper no_border">
              <span className="certified_art_header"> Contact</span>
              <span className="certified_art_technical_details">
                phone: {user.phone}
              </span>
              <span className="certified_art_technical_details">
                email: {user.email}
              </span>
              <span className="certified_art_technical_details">
                city:{user.city}
              </span>
              <span className="certified_art_technical_details">
                country: {user.country}
              </span>{" "}
              <span className="certified_art_technical_details">
                address: {user.address}
              </span>
            </div>
            <div className="technical_details_wrapper no_border grid_item_full">
              <span className="certified_art_header"> Socials</span>
              {user.instagram && <span>Instagram: {user.instagram}</span>}
              {user.youtube && <span>Youtube: {user.youtube}</span>}
              {user.blog && <span>Blog: {user.blog}</span>}
            </div>
            <span className="slider__title"> {author?.displayName}</span>
          </div>
        </div>
      </div>
    </Slider>
  );
}
