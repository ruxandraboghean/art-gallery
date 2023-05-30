import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getUsers = async () => {
  let users = [];

  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

export default getUsers;
