import { CertifiedArtwork } from "../../../components/Common/CertifiedArtwork";
import React, { useState } from "react";
import { useEffect } from "react";
import getAllCertifiedArtworks from "../../../data/artworks/getAllCertifiedArtworks";
import { SeeArtworkModal } from "../../../components/gallery/exhibition/SeeArtworkModal";
import { useContext } from "react";
import { ArtworkModalContext } from "../../../context/ArtworkModalContext";

export const Artworks = () => {
  const [certifiedArtworks, setCertifiedArtworks] = useState(null);
  const [isOpenArtwork, setIsOpenArtwork] = useState(false);
  const { currentCertifiedArtworkItem } = useContext(ArtworkModalContext);

  useEffect(() => {
    const getCertifiedArtworks = async () => {
      const certifiedArtworksData = await getAllCertifiedArtworks();
      setCertifiedArtworks(certifiedArtworksData);
      console.log(certifiedArtworksData, "certified data");
    };
    getCertifiedArtworks();
  }, []);
  return (
    <div className="certified-artworks-container">
      <span className="certified_artworks_title"> Certified Artworks </span>
      <div className="certified-artworks-wrapper">
        {certifiedArtworks?.map((art) => {
          return (
            <CertifiedArtwork
              art={art}
              key={art.id}
              setIsOpenArtwork={setIsOpenArtwork}
            />
          );
        })}
      </div>

      {isOpenArtwork && (
        <SeeArtworkModal
          isOpen={isOpenArtwork}
          onClose={() => setIsOpenArtwork(false)}
          artwork={currentCertifiedArtworkItem}
        />
      )}
    </div>
  );
};
