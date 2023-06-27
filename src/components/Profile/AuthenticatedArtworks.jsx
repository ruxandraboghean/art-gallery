import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import getCurrentUserArtworks from "../../data/currentUser/getCurrentUserArtworks";
import { useEffect } from "react";
import { useState } from "react";

import { AuthenticatedArt } from "./AuthenticatedArt";

export const AuthenticatedArtworks = () => {
  const { currentUser } = useContext(AuthContext);
  const { userArtworks, setUserArtworks } = useContext(ArtworkModalContext);
  const [userAuthenticatedArtworks, setUserAuthenticatedArtworks] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(currentUser).length > 0) {
        const userArtworksData = await getCurrentUserArtworks(currentUser);
        await setUserArtworks(userArtworksData);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (userArtworks.length !== 0) {
      const filteredArtworks = userArtworks.filter(
        (art) => art.isAuthenticated === true
      );
      setUserAuthenticatedArtworks(filteredArtworks);
    }
  }, [userArtworks]);

  return userAuthenticatedArtworks?.map((artwork) => {
    return <AuthenticatedArt artwork={artwork} key={artwork.id} />;
  });
};
