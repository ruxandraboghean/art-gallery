import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const getArtworkById = async (id) => {
  console.log(id, "id");
  try {
    const artworksRef = collection(db, "artworks");
    const artworksDocRef = doc(artworksRef, id);
    const artworkDocSnapshot = await getDoc(artworksDocRef);

    if (artworkDocSnapshot.exists()) {
      const artworkDetails = artworkDocSnapshot.data();
      return artworkDetails;
    } else {
      console.log("Artwork doc does not exist");
    }
  } catch (error) {
    console.error("Error getting artwork details: ", error);
  }
};

export default getArtworkById;
