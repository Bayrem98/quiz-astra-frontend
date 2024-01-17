import { useEffect, useState } from "react";
import User from "../../@types/User";
import { getUsers } from "../../actions/Users/action";

const Notifications = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    getUsers(setUsers);
  }, []);
  
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/image/background-home.jpg)",
          backgroundSize: "cover",
        }}
      ></div>
    </>
  );
};

export default Notifications;
