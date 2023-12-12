import React, { ChangeEvent, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

function Navbard() {
  const [isOpened, setIsOpened] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = <FontAwesomeIcon icon={faEye} />;

  const changeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const navigate = useNavigate();

  const toggleModal = (e: any) => {
    setIsOpened(!isOpened);
    e.preventDefault();
  };

  const handelClose = () => setIsOpened(false);

  const handleReset = () => {
    setUsername("");
    setPassword("");
    handelClose();
  };

  const generateRandomTokenValue = () => {
    const token = uuidv4();
    return token;
  };

  const token = generateRandomTokenValue();

  const logina = (e: any) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/auth/logina`, {
        username,
        password,
      })
      .then(({ data }) => {
        Cookies.set(
          "access_token",
          token,
          { expires: 5 / 24 } // 1 heure (1/24 de la journée)
        );
        window.location.reload();
        handelClose();
        navigateto();
        console.log(data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
      });
  };

  const navigateto = () => {
    window.location.replace("/questionstable");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };

  const logoutAdmin = () => {
    Cookies.remove("access_token");
    navigate("/accueil");
    window.location.reload();
  };

  return (
    <div>
      <Navbar
        className="my-2"
        color="secondary"
        dark
        style={{ position: "relative", top: 0 }}
      >
        <NavbarBrand href="#">Quiz-App</NavbarBrand>
        <div className="d-flex justify-content" style={{ marginLeft: -200 }}>
          <NavLink
            to={"/accueil"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 100,
            }}
          >
            Accueil
          </NavLink>
          <NavLink
            to={"/profil"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 100,
            }}
          >
            Profil
          </NavLink>

          {Cookies.get("access_token") ? (
            <>
              <UncontrolledDropdown inNavbar>
                <DropdownToggle
                  nav
                  caret
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  Paramétre-Admin
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/questionstable">
                    Ajouter Des Questions
                  </DropdownItem>
                  <DropdownItem href="/userstable">
                    Ajouter Des Utilisateurs
                  </DropdownItem>
                  <DropdownItem href="/adminuserstable">
                    Ajouter Des Admin-Utilisateurs
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <button
                style={{ marginLeft: 10, border: 0 }}
                onClick={logoutAdmin}
              >
                Logout-Admin
              </button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: 18,
                  marginRight: 100,
                  cursor: "pointer",
                }}
                onClick={toggleModal}
              >
                Admin-Session
              </span>
            </>
          )}
        </div>
        <NavLink
          to={"#"}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: 18,
            marginRight: 10,
          }}
          onClick={logout}
        >
          Déconnexion
        </NavLink>
      </Navbar>

      {isOpened ? (
        <Modal
          centered
          scrollable
          isOpen={isOpened}
          toggle={() => setIsOpened(false)}
        >
          <Form onSubmit={(e) => logina(e)}>
            <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
              {errorMessage && (
                <Alert
                  message=""
                  description={errorMessage}
                  type="error"
                  showIcon
                  style={{
                    width: "auto",
                    minWidth: "5ch",
                    maxWidth: "60ch",
                  }}
                />
              )}
            </ModalHeader>
            <ModalBody>
              <p className="modal-admin-title">Admin-connecte</p>
              <span className="modal-admin-closeicon" onClick={handelClose}>
                X
              </span>
              <FormGroup floating>
                <Input
                  value={username}
                  id="username"
                  name="username"
                  type="text"
                  onChange={changeUsername}
                />
                <Label className="modal-admin-label-text" for="username">
                  Username
                </Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  value={password}
                  id="password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  onChange={changePassword}
                />
                <i
                  className="modal-admin-eyeicon"
                  onClick={togglePasswordVisiblity}
                >
                  {eye}
                </i>
                <Label className="modal-admin-label-text" for="password">
                  Password
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <button
                className="modal-admin-button1"
                type="submit"
                disabled={!username || !password}
              >
                Confirm
              </button>
              <button className="modal-admin-button2" onClick={handleReset}>
                Annuler
              </button>
            </ModalFooter>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbard;
