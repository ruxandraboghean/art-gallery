import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArtworkArtistView } from "../components/Gallery/ArtworkArtistView";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const ManageArtworks = () => {
  const { currentUser } = useContext(AuthContext);
  const [artworks, setArtworks] = useState(null);

  useEffect(() => {
    async function getArtworks() {
      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArtworks(docSnap.data().artworks);
        console.log("Doc data: ", docSnap.data().artworks);
      } else {
        console.log("No such document!");
      }
    }

    getArtworks();
  }, [currentUser.uid]);

  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="gallery-container">
          <div className="gallery-wrapper">
            {artworks?.map((artwork) => (
              <ArtworkArtistView artwork={artwork} key={artwork.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
