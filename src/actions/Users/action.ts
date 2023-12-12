import axios from "axios";
import User from "../../@types/User";

export function getUsers(callback: (data: User[]) => void) {
  axios
    .get(`http://localhost:3000/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addUser(user: User, callback: () => void) {
  axios
    .post(`http://localhost:3000/user`, user)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editUser(user: User, callback: () => void) {
  axios
    .put(`http://localhost:3000/user/${user._id}`, user)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteUser(user: User, callback: () => void) {
  axios
    .delete(`http://localhost:3000/user/${user._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
