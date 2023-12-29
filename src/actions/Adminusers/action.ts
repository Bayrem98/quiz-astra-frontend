import axios from "axios";
import Adminuser from "../../@types/Adminuser";

export function getAdminusers(callback: (data: Adminuser[]) => void) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/adminuser`, {
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

export function getAdminuser(id: string, callback: (data: Adminuser) => void) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/adminuser/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((e) => {
      console.error(e);
    });
}

export function addAdminuser(adminuser: Adminuser, callback: () => void) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/adminuser`, adminuser)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editAdminuser(adminuser: Adminuser, callback: () => void) {
  axios
    .put(
      `${process.env.REACT_APP_API_URL}/adminuser/${adminuser._id}`,
      adminuser
    )
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteAdminuser(adminuser: Adminuser, callback: () => void) {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/adminuser/${adminuser._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
