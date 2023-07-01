import React, { useContext, useEffect } from "react";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import getArtworkById from "../../data/artworks/getArtworkById";
import { useState } from "react";

export const ArtistItem = () => {
  const { currentArtist } = useContext(ArtworkModalContext);
  const [userArtworks, setUserArtworks] = useState(null);

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    const getArtworks = async () => {
      const artworksIds = currentArtist.artworks;
      console.log(artworksIds, "ids");

      const artworksArray = await Promise.all(
        artworksIds.map(async (id) => {
          const artworkData = await getArtworkById(id.id);
          console.log(artworkData);
          return artworkData;
        })
      );

      const authenticatedArtworks = artworksArray.filter(
        (artwork) => artwork.isAuthenticated === true
      );

      const sortedArtworks = authenticatedArtworks.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const lastThreeArtworks = sortedArtworks.slice(0, 3);

      setUserArtworks(lastThreeArtworks);
    };

    getArtworks();
  }, [currentArtist.uid]);

  if (!currentArtist) {
    return <div> loading...</div>;
  }
  return (
    <div className="certified_art_wrapper">
      <div className="certified_art">
        <img
          src={currentArtist.photoURL}
          alt="artwork"
          className="certified_art_photo"
        />
        <div className="certified_art_informations">
          <span className="certified_art_title">
            {toSentenceCase(currentArtist.displayName)}
          </span>
          <span> - {currentArtist?.role} -</span>

          <div className="certified_art_content">
            <div className="technical_details_wrapper">
              <span className="certified_art_header"> About the artist</span>
              <span>{currentArtist.motto}</span>
            </div>
            <div className="technical_details_wrapper">
              <span className="certified_art_header"> Biography</span>
              <span className="certified_art_technical_details">
                {currentArtist.biography}
              </span>
            </div>

            {currentArtist.role === "expert" ? (
              <div className="technical_details_wrapper grid_item_full">
                <span className="certified_art_header">
                  Authenticated artworks
                </span>
              </div>
            ) : (
              <div className="user_artworks grid_item_full">
                <span className="certified_art_header">
                  Authenticated artworks
                </span>
                <div className="user_artworks_wrapper">
                  {userArtworks?.map((art) => {
                    return (
                      <div className="user_artwork" key={art?.id}>
                        <span className="user_artwork_title">
                          {art?.title}{" "}
                        </span>
                        <img
                          src={art?.photoURL}
                          alt="art"
                          className="art_photo"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
