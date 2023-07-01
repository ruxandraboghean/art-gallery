import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getAllArtworks = async () => {
  let artworks = [];
  const artworksRef = collection(db, "artworks");

  try {
    const querySnapshot = await getDocs(artworksRef);
    querySnapshot.docs.forEach((doc) => {
      artworks.push(doc.data());
    });
    return artworks;
  } catch (error) {
    console.error("Error getting artworks: ", error);
  }
};

export default getAllArtworks;
