import {
  collection,
  getDocs,
  query as firestoreQuery,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const getCurrentUserArtworks = async (currentUser) => {
  const artworksRef = collection(db, "artworks");

  const query = firestoreQuery(
    artworksRef,
    where("userId", "==", currentUser.uid)
  );

  try {
    const querySnapshot = await getDocs(query);
    const userArtworks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return userArtworks;
  } catch (error) {
    console.error("Error getting user artworks: ", error);
  }
};

export default getCurrentUserArtworks;
