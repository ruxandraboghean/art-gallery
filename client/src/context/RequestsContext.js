import { createContext, useState, useEffect } from "react";
import getAllRequests from "../data/requests/getAllRequests";

export const RequestContext = createContext();

export const RequestContextProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allRequests = await getAllRequests();
      setUserRequests(allRequests);
    };

    fetchData();
  }, []);

  return (
    <RequestContext.Provider
      value={{
        requests,
        setRequests,
        userRequests,
        setUserRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
