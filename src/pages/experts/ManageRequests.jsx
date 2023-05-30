import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";

import Select from "react-select";
// firebase
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

//notifications
import "react-toastify/dist/ReactToastify.css";
import getCurrentUserRequests from "../../data/currentUser/getCurrentUserRequests";
import { Request } from "../../components/experts/Request";
import { RequestContext } from "../../context/RequestsContext";
import getUserById from "../../data/users/getUserById";

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

  const [searchedInititator, setSearchedInitiator] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortData, setSortData] = useState(null);

  //modal for displaying a message for deleting confirmation
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const handleChange = (e) => {
    setSearchedInitiator(e.target.value);
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

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(currentUser).length > 0) {
        const userRequestsData = await getCurrentUserRequests(currentUser);
        setUserRequests(userRequestsData);
      }
    };

    if (currentUser) {
      fetchData();
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
            {userRequests.length === 0 ? (
              <p>Loading requests...</p>
            ) : (
              (filteredData.length === 0 ? userRequests : filteredData)?.map(
                (request) => (
                  <Request
                    request={request}
                    key={request.id}
                    isOpenConfirmationModal={isOpenConfirmationModal}
                    setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
