import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const getRequestById = async (id) => {
  try {
    const requestsRef = collection(db, "requests");
    const requestsDocRef = doc(requestsRef, id);
    const requestDocSnapshot = await getDoc(requestsDocRef);

    if (requestDocSnapshot.exists()) {
      const requestDetails = requestDocSnapshot.data();
      return requestDetails;
    } else {
      console.log("Request doc does not exist");
    }
  } catch (error) {
    console.error("Error getting request details: ", error);
  }
};

export default getRequestById;
