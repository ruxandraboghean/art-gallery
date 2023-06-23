import React from "react";

import { General } from "./General/General";
import { Exhibitions } from "./Exhibitions/Exhibitions";
import { AuthenticatedArtworks } from "./AuthenticatedArtworks";

export const UserCard = ({ currentUser, currentSection }) => {
  return (
    <div className="user-card">
      {currentSection === "authenticated-artworks" ? (
        <AuthenticatedArtworks />
      ) : currentSection === "exhibitions" ? (
        <Exhibitions />
      ) : (
        <General currentUser={currentUser} />
      )}
    </div>
  );
};
