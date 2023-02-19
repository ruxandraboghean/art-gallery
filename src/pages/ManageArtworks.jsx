import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArtworkArtistView } from "../components/Gallery/ArtworkArtistView";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import { Link } from "react-router-dom";

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
            <div className="artworks-container">
              <div className="title">Manage Artworks</div>

              <div className="filter">
                <div className="inputs">
                  <div className="filter-item">
                    <label htmlFor="title">TITLE</label>
                    <input type="text" id="title" />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="artwork">ARTWORK</label>
                    <input type="text" id="artwork" />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="tags">TAGS</label>
                    <input type="text" id="tags" />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="technique">TECHNIQUE</label>
                    <input type="text" id="technique" />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="sort">SORT BY</label>
                    <input type="text" id="sort" />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="order">ORDER</label>
                    <input type="text" id="order" />
                  </div>
                </div>
                <div className="buttons">
                  <button className="search-btn">SEARCH</button>
                  <button className="show-all-btn"> RESET </button>
                  <Link to="/add-artwork">
                    <button className="add-artwork">ADD NEW</button>
                  </Link>
                </div>
              </div>
              <div className="header">
                <div className="header-item">IMAGE</div>
                <div className="header-item">TITLE</div>
                <div className="header-item">STATUS</div>
                <div className="header-item">ACTIONS</div>
              </div>
              {artworks?.map((artwork) => (
                <ArtworkArtistView artwork={artwork} key={artwork.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
