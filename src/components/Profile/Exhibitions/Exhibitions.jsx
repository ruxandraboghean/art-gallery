import React from "react";
import { useState } from "react";
import getAllExhibitions from "../../../data/exhibitions/getAllExhibitions";
import { useEffect } from "react";
import { Exhibition } from "./Exhibition";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export const Exhibitions = () => {
  const [userExhibitions, setUserExhibitions] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getExhibitions = async () => {
      const data = await getAllExhibitions();
      const filteredExhibitions = data.filter(
        (expo) => expo.author === currentUser.uid
      );
      setUserExhibitions(filteredExhibitions);
    };

    getExhibitions();
  }, []);

  return userExhibitions?.map((exhibition) => {
    return (
      <Exhibition
        key={exhibition.id}
        exhibition={exhibition}
        exhibitions={userExhibitions}
        setUserExhibitions={setUserExhibitions}
      />
    );
  });
};
