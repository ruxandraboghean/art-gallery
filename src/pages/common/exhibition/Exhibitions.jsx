import React from "react";
import { useState } from "react";
import { SeeExhibitionModal } from "../../../components/gallery/Exhibition/SeeExhibitionModal";
import { CardExhibition } from "../../../components/gallery/Exhibition/CardExhibition";
import { useEffect } from "react";
import getAllExhibitions from "../../../data/exhibitions/getAllExhibitions";

export const Exhibitions = () => {
  const [isOpenExhibitionModal, setIsOpenExhibitionModal] = useState(false);
  const [exhibitions, setExhibitions] = useState(null);
  const [currentExpo, setCurrentExpo] = useState(null);

  useEffect(() => {
    const getExhibitions = async () => {
      const exhibitionData = await getAllExhibitions();
      setExhibitions(exhibitionData);
    };
    getExhibitions();
  }, []);
  return (
    <div className="works-container">
      <div className="works-title">Exhibitions</div>
      <div className="works-wrapper">
        <div className="exhibition-wrapper">
          {exhibitions?.map((exhibition) => {
            return (
              <CardExhibition
                exhibition={exhibition}
                key={exhibition.id}
                isOpenExhibitionModal={isOpenExhibitionModal}
                setIsOpenExhibitionModal={setIsOpenExhibitionModal}
                setCurrentExpo={setCurrentExpo}
                artworks={exhibition.artworks}
              />
            );
          })}
        </div>

        <div className="exhibition-wrapper">
          {exhibitions?.reverse()?.map((exhibition) => {
            return (
              <CardExhibition
                exhibition={exhibition}
                key={exhibition.id}
                isOpenExhibitionModal={isOpenExhibitionModal}
                setIsOpenExhibitionModal={setIsOpenExhibitionModal}
                setCurrentExpo={setCurrentExpo}
                artworks={exhibition.artworks}
              />
            );
          })}
        </div>
      </div>

      {isOpenExhibitionModal && (
        <SeeExhibitionModal
          isOpen={isOpenExhibitionModal}
          onClose={() => setIsOpenExhibitionModal(false)}
          artworks={Object.values(currentExpo?.artworks)}
        />
      )}
    </div>
  );
};
