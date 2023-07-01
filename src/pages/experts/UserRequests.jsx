import React from "react";
import { Request } from "../../components/experts/Request";
import { NoData } from "../../components/utils/NoData";
import { Spinner } from "../../components/utils/Spinner";
import { useState } from "react";
import { useEffect } from "react";

export const UserRequests = ({
  userRequests,
  filteredData,
  isOpenConfirmationModal,
  setIsOpenConfirmationModal,
  setCurrentRequest,
  isOpenDocumentsModal,
  setIsOpenDocumentsModal,
  artwork,
  setArtwork,
  currentRequest,
  setRequestedArtwork,
  requestedArtwork,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userRequests]);

  if (isLoading) {
    return <Spinner />;
  }

  if (userRequests?.length === 0) {
    return <NoData />;
  }

  return (
    <>
      {(filteredData.length === 0 ? userRequests : filteredData)?.map(
        (request) => (
          <Request
            request={request}
            key={request.id}
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
        )
      )}
    </>
  );
};
