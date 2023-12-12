import axios from "axios";
import Cookies from "js-cookie";

export function login(
  username: string,
  pass: string,
  callback: (data: any) => void,
  fallback: () => void
) {
  axios
    .post(`http://localhost:3000/auth/login`, {
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
    .post(`http://localhost:3000/auth/logina`, {
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
  window.location.reload();
}

export function logoutAdmin() {
  Cookies.remove("access_token");
  window.location.reload();
}
