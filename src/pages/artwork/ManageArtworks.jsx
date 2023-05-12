import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../../context/AuthContext";
// firebase
import { db } from "../../firebase";
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
import { ArtworkArtistView } from "../../components/gallery/ArtworkArtistView";

//notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDisplayedMessage, setHasDisplayedMessage] = useState(false);

  const handleChange = (e) => {
    setSearchedTitle(e.target.value);
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setSortData({ ...sortData, [dropdownLabel]: { label, value } });
  };

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

  useEffect(() => {
    if (isSuccess && !hasDisplayedMessage) {
      toast.success("Action successfully completed!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: "#AF92C6",
          color: "#fff",
        },
      });
      setHasDisplayedMessage(true);
    }
  }, [isSuccess, hasDisplayedMessage]);

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="artworks-container">
          <div className="artworks-header">
            <div className="title">Artworks</div>

            <div className="filter">
              <div className="inputs">
                <div className="filter-item">
                  <label htmlFor="title">TITLE</label>
                  <input
                    value={searchedTitle}
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
                    value={sortData?.sortBy || null}
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
                    value={sortData?.order || null}
                    onChange={({ label, value }) =>
                      handleDropdownChange("order", { label, value })
                    }
                    options={orderOptions}
                    className="dropdown-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works">
            {(filteredData.length === 0 ? artworks : filteredData)?.map(
              (artwork) => (
                <ArtworkArtistView
                  artwork={artwork}
                  key={artwork.id}
                  setIsSuccess={setIsSuccess}
                />
              )
            )}
          </div>
        </div>
      </div>
      {isSuccess && <ToastContainer />}
    </div>
  );
};
