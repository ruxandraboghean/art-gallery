import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateRequests = async (id, data) => {
  try {
    await updateDoc(doc(db, "requests", id), data);
  } catch (error) {
    console.error("Error updating requests: ", error);
  }
};

export default updateRequests;
