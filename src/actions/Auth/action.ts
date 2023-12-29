import axios from "axios";
import Cookies from "js-cookie";

export function login(
  username: string,
  pass: string,
  callback: (data: any) => void,
  fallback: () => void
) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      username: username,
      password: pass,
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
      fallback();
    });
}

export function logina(
  username: string,
  pass: string,
  callback: (data: any) => void,
  fallback: () => void
) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/auth/logina`, {
      username: username,
      password: pass,
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
      fallback();
    });
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  window.location.reload();
}

export function logoutAdmin() {
  Cookies.remove("access_token");
  window.location.reload();
}
