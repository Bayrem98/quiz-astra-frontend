import axios from "axios";
import Adminuser from "../../@types/Adminuser";

export function getAdminusers(callback: (data: Adminuser[]) => void) {
  axios
    .get(`http://localhost:3000/adminuser`, {
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

export function addAdminuser(adminuser: Adminuser, callback: () => void) {
  axios
    .post(`http://localhost:3000/adminuser`, adminuser)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editAdminuser(adminuser: Adminuser, callback: () => void) {
  axios
    .put(`http://localhost:3000/adminuser/${adminuser._id}`, adminuser)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteAdminuser(adminuser: Adminuser, callback: () => void) {
  axios
    .delete(`http://localhost:3000/adminuser/${adminuser._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
