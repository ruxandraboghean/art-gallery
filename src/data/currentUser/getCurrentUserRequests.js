import {
  collection,
  getDocs,
  query as firestoreQuery,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const getCurrentUserRequests = async (currentUser) => {
  const requestsRef = collection(db, "requests");

  const query = firestoreQuery(
    requestsRef,
    where("receiver", "==", currentUser.uid)
  );

  try {
    const querySnapshot = await getDocs(query);
    const userRequests = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return userRequests;
  } catch (error) {
    console.error("Error getting user requests: ", error);
  }
};

export default getCurrentUserRequests;
