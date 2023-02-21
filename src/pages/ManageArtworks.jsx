import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// firebase
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
//components
import { ArtworkArtistView } from "../components/Gallery/ArtworkArtistView";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import Select from "react-select";

const initialState = {
  title: "",
  sortBy: null,
  order: null,
};

const sortOptions = [
  { label: "date", value: "date" },
  { label: "artist", value: "artist" },
  { label: "title", value: "title" },
];

const orderOptions = [
  { label: "asc", value: "asc" },
  { label: "desc", value: "desc" },
];

export const ManageArtworks = () => {
  const { currentUser } = useContext(AuthContext);
  const [artworks, setArtworks] = useState(null);
  const [filterData, setFilterData] = useState(initialState);

  const handleChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setFilterData({ ...filterData, [dropdownLabel]: { label, value } });
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where(`title`, "==", filterData.title.toLowerCase())
    );

    if (!q.res) {
      setFilterData({ ...filterData, title: "" });
      console.log("...not found");
    }

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setFilterData({ ...filterData, title: doc.data() });
        console.log(doc.data(), "found");
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSearch();
  // };

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

  useEffect(() => {
    setFilterData({
      ...filterData,
      sortBy: { label: "sortBy", value: filterData.sortBy },
      order: { label: "order", value: filterData.order },
    });
  }, []);

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
                    <input type="text" id="title" onChange={handleChange} />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="sort">SORT BY</label>
                    <Select
                      value={filterData?.sortBy}
                      onChange={({ label, value }) =>
                        handleDropdownChange("sortBy", { label, value })
                      }
                      options={sortOptions}
                      className="dropdown-input"
                    />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="order">ORDER</label>
                    <Select
                      value={filterData?.order}
                      onChange={({ label, value }) =>
                        handleDropdownChange("order", { label, value })
                      }
                      options={orderOptions}
                      className="dropdown-input"
                    />
                  </div>
                </div>
                <div className="buttons">
                  <button className="search-btn" onClick={handleSearch}>
                    SEARCH
                  </button>
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
