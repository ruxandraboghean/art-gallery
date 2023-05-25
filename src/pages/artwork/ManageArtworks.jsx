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

  const getArtworks = async () => {
    const docRef = collection(db, "artworks");
    const docs = await getDocs(docRef);
    let artData = [];

    docs.forEach((doc) => {
      artData = [...artData, doc.data()];
    });

    console.log(artData, "artworks in async method");

    const userDocRef = doc(db, "users", currentUser.uid);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const artworksDatabaseIds = docSnap.data().artworks;
      console.log(artworksDatabaseIds, "has artworks?");
      if (artworksDatabaseIds) {
        setIsLoading(true);
        const artworkIds = Object.values(artworksDatabaseIds).map(
          (artId) => artId.id
        );
        const filteredArtworks = artData.filter((artwork) =>
          artworkIds.includes(artwork.id)
        );

        setUserArtworks(filteredArtworks);
        setIsLoading(false);
      } else {
        console.log("User has not artworks");
      }
    } else {
      console.log("No such document!");
    }
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
        filteredData.length === 0 ? userArtworks : filteredData
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const getSortedArtworks = async (sortType, orderType) => {
    const artCollection = collection(db, "artworks");

    if (orderType === "desc") {
      const data = await getDocs(
        query(artCollection, orderBy(sortType, "desc"))
      );
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserArtworks(newData);
    } else {
      const data = await getDocs(
        query(artCollection, orderBy(sortType, "asc"))
      );
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserArtworks(newData);
    }
  };

  useEffect(() => {
    getArtworks();
    setUserArtworks([]);
  }, [currentUser.uid]);

  useEffect(() => {
    if (
      sortData?.sortBy === null ||
      sortData?.order === null ||
      sortData === null
    ) {
      console.log("SORT data is null");
    } else {
      const sortType = sortData?.sortBy?.label;
      const orderType = sortData?.order?.label;
      getSortedArtworks(sortType, orderType);
    }
  }, [currentUser.id, sortData]);

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
