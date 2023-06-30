import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";

import Select from "react-select";
// firebase
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

//notifications
import "react-toastify/dist/ReactToastify.css";
import getCurrentUserRequests from "../../data/currentUser/getCurrentUserRequests";
import { RequestContext } from "../../context/RequestsContext";
import getUserById from "../../data/users/getUserById";
import { ConfirmationModal } from "../../components/gallery/modals/ConfirmationModal";
import { DocumentsModal } from "./DocumentsModal";
import { NoData } from "../../components/utils/NoData";
import { Request } from "../../components/experts/Request";
import { UserRequests } from "./UserRequests";

const sortOptions = [
  { label: "date", value: "date" },
  { label: "status", value: "status" },
];

const orderOptions = [
  { label: "asc", value: "asc" },
  { label: "desc", value: "desc" },
];

export const ManageRequests = () => {
  const { currentUser } = useContext(AuthContext);
  const { userRequests, setUserRequests } = useContext(RequestContext);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [requestedArtwork, setRequestedArtwork] = useState(null);

  const [searchedInititator, setSearchedInitiator] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortData, setSortData] = useState(null);

  //modal for displaying a message for deleting confirmation
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [isOpenDocumentsModal, setIsOpenDocumentsModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState("pending");

  const handleChange = (e) => {
    setSearchedInitiator(e.target.value);
  };

  const handleChangeTab = (tabName) => {
    fetchData(tabName);
    setCurrentTab(tabName);
  };

  const handleDropdownChange = (dropdownLabel, { label, value }) => {
    setSortData({ ...sortData, [dropdownLabel]: { label, value } });
  };

  const handleSearch = useCallback(async () => {
    const requestsFiltered = await Promise.all(
      userRequests.map(async (request) => {
        const initiator = await getUserById(request.initiator);
        return initiator.displayName
          .toLowerCase()
          .includes(searchedInititator.toLowerCase());
      })
    );

    const requestFilteredData = userRequests?.filter(
      (request, index) => requestsFiltered[index]
    );

    setFilteredData(requestFilteredData);
  }, [searchedInititator, userRequests]);

  const handleKey = (e) => {
    console.log(e, "enter");
    e.code === "Enter" && handleSearch();
  };

  const getSortedRequests = useCallback(
    async (sortType, orderType) => {
      const requestCollection = collection(db, "requests");

      if (orderType === "desc") {
        const data = await getDocs(
          query(
            requestCollection,
            where("receiver", "==", currentUser.uid),
            orderBy(sortType, "desc")
          )
        );
        const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(newData, `data ordered DESC by ${sortType} `);
        setUserRequests(newData);
      } else if (orderType === "asc") {
        const data = await getDocs(
          query(
            requestCollection,
            where("receiver", "==", currentUser.uid),
            orderBy(sortType, "asc")
          )
        );
        const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserRequests(newData);
      } else {
        return;
      }
    },
    [currentUser.uid, setUserRequests]
  );

  const fetchData = async (tabName) => {
    if (Object.keys(currentUser).length > 0) {
      const userRequestsData = await getCurrentUserRequests(currentUser);

      switch (tabName) {
        case "pending":
          setUserRequests(
            userRequestsData.filter((req) => req.status === "pending")
          );
          break;
        case "accepted":
          setUserRequests(
            userRequestsData.filter((req) => req.status === "accepted")
          );
          break;
        case "denied":
          setUserRequests(
            userRequestsData.filter((req) => req.status === "denied")
          );
          break;
        case "completed":
          setUserRequests(
            userRequestsData.filter((req) => req.status === "completed")
          );
          break;
        default:
          setUserRequests(userRequestsData);
          break;
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData("pending");
    }
  }, [currentUser, setUserRequests]);

  useEffect(() => {
    if (sortData && sortData.sortBy && sortData.order) {
      const sortType = sortData.sortBy.value;
      const orderType = sortData.order.value;
      getSortedRequests(sortType, orderType);
    }
  }, [sortData, getSortedRequests]);

  useEffect(() => {
    handleSearch();
  }, [searchedInititator, handleSearch]);
  console.log("current req: ", userRequests);

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="artworks-container">
          <div className="artworks-header">
            <div className="title">Requests</div>

            <div className="filter">
              <div className="inputs">
                <div className="filter-item">
                  <label htmlFor="title">Initiator</label>
                  <input
                    value={searchedInititator}
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
            <div className="works-header">
              <div
                className={`work-section ${
                  currentTab === "pending" && "selected"
                }`}
                onClick={() => handleChangeTab("pending")}
              >
                pending
              </div>
              <div
                className={`work-section ${
                  currentTab === "accepted" && "selected"
                }`}
                onClick={() => handleChangeTab("accepted")}
              >
                accepted
              </div>
              <div
                className={`work-section ${
                  currentTab === "denied" && "selected"
                }`}
                onClick={() => handleChangeTab("denied")}
              >
                denied
              </div>
              <div
                className={`work-section ${
                  currentTab === "completed" && "selected"
                }`}
                onClick={() => handleChangeTab("completed")}
              >
                completed
              </div>
            </div>
            <UserRequests
              userRequests={userRequests}
              filteredData={filteredData}
              isOpenConfirmationModal={isOpenConfirmationModal}
              setIsOpenConfirmationModal={setIsOpenConfirmationModal}
              setCurrentRequest={setCurrentRequest}
              isOpenDocumentsModal={isOpenDocumentsModal}
              setIsOpenDocumentsModal={setIsOpenDocumentsModal}
              artwork={artwork}
              setArtwork={setArtwork}
              currentRequest={currentRequest}
              setRequestedArtwork={setRequestedArtwork}
              requestedArtwork={requestedArtwork}
            />
          </div>
        </div>
      </div>
      {isOpenConfirmationModal && (
        <ConfirmationModal
          id={currentRequest}
          isOpenConfirmationModal={isOpenConfirmationModal}
          setIsOpenConfirmationModal={setIsOpenConfirmationModal}
          setIsSuccess={setIsSuccess}
          type="requests"
        />
      )}
      {isOpenDocumentsModal && (
        <DocumentsModal
          artwork={requestedArtwork}
          setIsOpenDocumentsModal={setIsOpenDocumentsModal}
          request={currentRequest}
        />
      )}
    </div>
  );
};
