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
  orderBy,
  query,
  where,
} from "firebase/firestore";
//components
import { ArtworkArtistView } from "../components/Gallery/ArtworkArtistView";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import Select from "react-select";

const sortOptions = [
  { label: "year", value: "year" },
  { label: "title", value: "title" },
];

const orderOptions = [
  { label: "asc", value: "asc" },
  { label: "desc", value: "desc" },
];

export const ManageArtworks = () => {
  const { currentUser } = useContext(AuthContext);
  const [artworks, setArtworks] = useState(null);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortData, setSortData] = useState(null);

  const handleChange = (e) => {
    setSearchedTitle(e.target.value);
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setSortData({ ...sortData, [dropdownLabel]: { label, value } });
  };

  const handleReset = () => {
    console.log("reseting");
    setSearchedTitle("");
    setSortData(null);
  };

  useEffect(() => {
    const artCollection = collection(db, "artworks");

    if (
      sortData?.sortBy === null ||
      sortData?.order === null ||
      sortData === null
    ) {
      console.log("SORT data is null");
    } else {
      const sortType = sortData?.sortBy?.label;
      const orderType = sortData?.order?.label;

      const getSortedArtworks = async (sortType, orderType) => {
        if (orderType === "desc") {
          const data = await getDocs(
            query(artCollection, orderBy(sortType, "desc"))
          );
          const newData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setArtworks(newData);
        } else {
          const data = await getDocs(
            query(artCollection, orderBy(sortType, "asc"))
          );
          const newData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setArtworks(newData);
        }
      };

      getSortedArtworks(sortType, orderType);
    }
  }, [sortData]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "artworks"),
      where("title", "==", searchedTitle)
    );

    if (!q.res) {
      setFilteredData([]);
      console.log("...not found");
    }

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setFilteredData((filteredData) => [...filteredData, doc.data()]);
      });

      console.log("FOUND DATA: ", filteredData);
      console.log(
        " DATA: ",
        filteredData.length === 0 ? artworks : filteredData
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  useEffect(() => {
    async function getArtworks() {
      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArtworks(docSnap.data().artworks);
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
                    <input
                      name="title"
                      type="text"
                      id="title"
                      onChange={handleChange}
                      onKeyDown={handleKey}
                    />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="sort">SORT BY</label>
                    <Select
                      value={sortData?.sortBy}
                      onChange={({ label, value }) =>
                        handleDropdownChange("sortBy", { label, value })
                      }
                      options={sortOptions}
                      className="dropdown-input"
                    />
                  </div>
                  <div className="filter-item">
                    <label htmlFor="sort">ORDER</label>
                    <Select
                      value={sortData?.order}
                      onChange={({ label, value }) =>
                        handleDropdownChange("order", { label, value })
                      }
                      options={orderOptions}
                      className="dropdown-input"
                    />
                  </div>
                </div>
                <div className="buttons">
                  <button className="show-all-btn" onClick={handleReset}>
                    RESET
                  </button>
                  <Link to="/add-artwork">
                    <button className="add-artwork">ADD NEW</button>
                  </Link>
                </div>
              </div>
              <div className="header">
                <div className="header-item">IMAGE</div>
                <div className="header-item">TITLE</div>
                <div className="header-item">YEAR</div>
                <div className="header-item">STATUS</div>
                <div className="header-item">ACTIONS</div>
              </div>
              {(filteredData.length === 0 ? artworks : filteredData)?.map(
                (artwork) => (
                  <ArtworkArtistView artwork={artwork} key={artwork.id} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
