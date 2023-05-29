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
import { ConfirmationModal } from "../../components/gallery/modals/ConfirmationModal";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import getCurrentUserArtworks from "../../data/getCurrentUserArtworks";

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
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortData, setSortData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDisplayedMessage, setHasDisplayedMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userArtworks, setUserArtworks } = useContext(ArtworkModalContext);

  //modal for displaying a message for deleting confirmation
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const handleChange = (e) => {
    setSearchedTitle(e.target.value);
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setSortData({ ...sortData, [dropdownLabel]: { label, value } });
  };

  const handleSearch = async () => {
    const artworksFiltered = await userArtworks?.filter((artwork) =>
      artwork.title.toLowerCase().includes(searchedTitle.toLowerCase())
    );

    setFilteredData(artworksFiltered);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const getSortedArtworks = async (sortType, orderType) => {
    const artCollection = collection(db, "artworks");

    if (orderType === "desc") {
      const data = await getDocs(
        query(
          artCollection,
          where("userId", "==", currentUser.uid),
          orderBy(sortType, "desc")
        )
      );
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(newData, `data ordered DESC by ${sortType} `);
      setUserArtworks(newData);
    } else if (orderType === "asc") {
      const data = await getDocs(
        query(
          artCollection,
          where("userId", "==", currentUser.uid),
          orderBy(sortType, "asc")
        )
      );
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserArtworks(newData);
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(currentUser).length > 0) {
        console.log(currentUser, "user");
        const userArtworksData = await getCurrentUserArtworks(currentUser);
        setUserArtworks(userArtworksData);
      }
    };

    if (currentUser || (isSuccess && !hasDisplayedMessage)) {
      fetchData();
    }
  }, [currentUser, isSuccess, hasDisplayedMessage]);

  useEffect(() => {
    if (sortData && sortData.sortBy && sortData.order) {
      const sortType = sortData.sortBy.value;
      const orderType = sortData.order.value;
      getSortedArtworks(sortType, orderType);
    }
  }, [sortData]);

  useEffect(() => {
    if (isSuccess && !hasDisplayedMessage) {
      toast.success("Action successfully completed!", {
        position: "bottom-right",
        autoClose: 2000,
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
  }, [isSuccess, hasDisplayedMessage, currentUser]);

  useEffect(() => {
    handleSearch();
  }, [searchedTitle]);

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
            {userArtworks.length === 0 ? (
              <p>No artworks found</p>
            ) : (
              (filteredData.length === 0 ? userArtworks : filteredData)?.map(
                (artwork) => (
                  <ArtworkArtistView
                    artwork={artwork}
                    key={artwork.id}
                    isOpenConfirmationModal={isOpenConfirmationModal}
                    setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                    setCurrentArtwork={setCurrentArtwork}
                    setUserArtworks={setUserArtworks}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
      {isSuccess && <ToastContainer />}
      {isOpenConfirmationModal && (
        <ConfirmationModal
          artworkId={currentArtwork}
          isOpenConfirmationModal={isOpenConfirmationModal}
          setIsOpenConfirmationModal={setIsOpenConfirmationModal}
          setIsSuccess={setIsSuccess}
          setUserArtworks={setUserArtworks}
        />
      )}
    </div>
  );
};
