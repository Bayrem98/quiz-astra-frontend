import axios from "axios";
import Supadmin from "../../@types/Supadmin";

export function getSupadmins(callback: (data: Supadmin[]) => void) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/supadmin`, {
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

export function getSupadmin(id: string, callback: (data: Supadmin) => void) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/supadmin/` + id, {
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

export function addSupadmin(supadmin: Supadmin, callback: () => void) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/supadmin`, supadmin)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editSupadmin(supadmin: Supadmin, callback: () => void) {
  axios
    .put(`${process.env.REACT_APP_API_URL}/supadmin/${supadmin._id}`, supadmin)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteSupadmin(supadmin: Supadmin, callback: () => void) {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/supadmin/${supadmin._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
