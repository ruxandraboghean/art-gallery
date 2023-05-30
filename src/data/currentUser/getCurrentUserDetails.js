import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const getCurrentUserDetails = async (currentUser) => {
  try {
    const usersRef = collection(db, "users");
    const usersDocRef = doc(usersRef, currentUser.uid);
    const userDocSnapshot = await getDoc(usersDocRef);

    if (userDocSnapshot.exists()) {
      const userDetails = userDocSnapshot.data();
      console.log(userDetails, "details");
      return userDetails;
    } else {
      console.log("User doc does not exist");
    }
  } catch (error) {
    console.error("Error getting user details: ", error);
  }
};

export default getCurrentUserDetails;
