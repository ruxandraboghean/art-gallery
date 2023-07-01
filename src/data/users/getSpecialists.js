import getUsers from "./getUsers";

const getSpecialists = async () => {
  let users = await getUsers();
  let specialists = [];

  users.map((user) => {
    user.role === "expert" && specialists.push(user);
    return user;
  });
  return specialists;
};

export default getSpecialists;
