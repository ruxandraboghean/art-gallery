import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const getUserById = async (id) => {
  try {
    const usersRef = collection(db, "users");
    const usersDocRef = doc(usersRef, id);
    const userDocSnapshot = await getDoc(usersDocRef);

    if (userDocSnapshot.exists()) {
      const userDetails = userDocSnapshot.data();
      return userDetails;
    } else {
      console.log("User doc does not exist");
    }
  } catch (error) {
    console.error("Error getting user details: ", error);
  }
};

export default getUserById;
