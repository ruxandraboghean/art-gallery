import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import * as AiIcons from "react-icons/ai";

export const Notifications = () => {
  const [notifications, setNotifications] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const userDocRef = doc(db, "users", currentUser.uid);

  const getNotifications = async () => {
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const userNotifications = docSnap.data().notifications;
      const sortedNotifications = userNotifications.sort(
        (a, b) => b.time - a.time
      );
      setNotifications(sortedNotifications);
    } else {
      console.log("User notifications does not exist");
    }
  };

  const handleDeleteNotification = async (id) => {
    const updatedNotifications = Object.values(notifications).filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);

    await updateDoc(userDocRef, {
      notifications: updatedNotifications,
    });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="notifications__container">
      {notifications?.map((notification) => {
        return (
          <div className="notification__container" key={notification.id}>
            <img
              src={notification.image}
              alt="user"
              className="current-user notification__image"
            />
            <div className="notification__content">
              <p>{notification.message} </p>
              <p className="notification__date">
                date: {new Date(notification.time).toLocaleString() || ""}
              </p>
            </div>
            <AiIcons.AiOutlineDelete
              className="delete__notification"
              onClick={() => handleDeleteNotification(notification.id)}
            />
          </div>
        );
      })}
    </div>
  );
};
