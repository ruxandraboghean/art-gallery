import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const getSpecialists = async () => {
  let users = [];
  let specialists = [];

  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  users.map((user) => {
    user.role === "expert" && specialists.push(user);
  });
  return specialists;
};

export default getSpecialists;
