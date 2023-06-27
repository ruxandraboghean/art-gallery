import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getAllExhibitions = async () => {
  let exhibitions = [];
  const exhibitionsRef = collection(db, "exhibitions");

  try {
    const querySnapshot = await getDocs(exhibitionsRef);
    querySnapshot.docs.forEach((doc) => {
      exhibitions.push(doc.data());
    });
    return exhibitions;
  } catch (error) {
    console.error("Error getting exhibitions: ", error);
  }
};

export default getAllExhibitions;
