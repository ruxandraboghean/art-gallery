import React from "react";
import { Artist } from "../../components/users/Artist";
import getUsers from "../../data/users/getUsers";
import { useState } from "react";
import { useEffect } from "react";
import { SeeUserModal } from "../../components/gallery/Exhibition/SeeUserModal";
import { ArtworkModalContext } from "../../context/ArtworkModalContext";
import { useContext } from "react";

export const Artists = () => {
  const [users, setUsers] = useState(null);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const { currentArtist } = useContext(ArtworkModalContext);

  useEffect(() => {
    const getUsersData = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    getUsersData();
  }, []);

  return (
    <div className="artists-container">
      <span className="artists_title"> Artists, Specialists, Validators </span>

      <div className="artists-wrapper">
        {users?.map((user) => {
          return (
            <Artist
              user={user}
              key={user.uid}
              setIsOpenUserModal={setIsOpenUserModal}
            />
          );
        })}
      </div>
      {isOpenUserModal && (
        <SeeUserModal
          isOpen={isOpenUserModal}
          onClose={() => setIsOpenUserModal(false)}
          user={currentArtist}
        />
      )}
    </div>
  );
};
