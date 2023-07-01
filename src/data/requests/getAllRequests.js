import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getAllRequests = async () => {
  let requests = [];
  const requestsRef = collection(db, "requests");

  try {
    const querySnapshot = await getDocs(requestsRef);
    querySnapshot.docs.forEach((doc) => {
      requests.push(doc.data());
    });
    return requests;
  } catch (error) {
    console.error("Error getting requests: ", error);
  }
};

export default getAllRequests;
