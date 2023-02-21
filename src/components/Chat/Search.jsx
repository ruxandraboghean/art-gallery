import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useOnOutsideClick } from "../../hooks/useOnOutsideClick";

export const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleClickOutside = () => {
    setUser(null);
    setUsername("");
    setErr(false);
  };

  const ref = useOnOutsideClick(handleClickOutside);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username.toLowerCase())
    );
    if (!q.res) {
      setErr(true);
      setUser(null);
    }

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setErr(false);
      });
    } catch (err) {
      setErr(true);
    }
  };
  console.log(err);
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check weather the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="search-form">
        <div className="search-text">
          <input
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      </div>

      {user && (
        <div ref={ref} onClick={handleSelect} className="user-chat">
          <img src={user.photoURL} alt="avatar" />
          <div className="user-chat-info">
            <span> {user.displayName}</span>
          </div>
        </div>
      )}
      {err && (
        <span ref={ref} className="not-found">
          User not found
        </span>
      )}
    </div>
  );
};
