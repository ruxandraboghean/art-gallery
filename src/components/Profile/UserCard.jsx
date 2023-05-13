import React from "react";

import { General } from "./General/General";
import { Exhibitions } from "./Exhibitions/Exhibitions";
import { AutheticatedArtworks } from "./AutheticatedArtworks/AutheticatedArtworks";

export const UserCard = ({ currentUser, currentSection }) => {
  return (
    <div className="user-card">
      {currentSection === "authenticated-artworks" ? (
        <AutheticatedArtworks />
      ) : currentSection === "exhibitions" ? (
        <Exhibitions />
      ) : (
        <General currentUser={currentUser} />
      )}
    </div>
  );
};
