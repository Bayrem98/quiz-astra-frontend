import React, { ChangeEvent, useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
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
import User from "../../@types/User";
import { getUser } from "../../actions/Users/action";
import Adminuser from "../../@types/Adminuser";
import { getAdminuser } from "../../actions/Adminusers/action";

function Navbard() {
  const [isOpened, setIsOpened] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const [adminuser, setAdminuser] = useState<Adminuser | null>(null);

  useEffect(() => {
    if (userId) {
      getUser(userId, setUserData);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getAdminuser(userId, setAdminuser);
    }
  }, []);

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
    localStorage.removeItem("user_id");
    localStorage.removeItem("quiz_responses");
    navigate("/");
    window.location.reload();
  };

  const logoutAdmin = () => {
    Cookies.remove("access_token");
    navigate("/home");
    window.location.reload();
  };

  const userId = localStorage.getItem("user_id");

  return (
    <>
      <Navbar
        color="secondary"
        dark
        style={{ position: "fixed", top: 0, zIndex: 999, width: "100%" }}
      >
        <NavbarBrand href="/home">Quiz-App</NavbarBrand>
        <div className="d-flex justify-content" style={{ marginRight: 250 }}>
          <NavLink
            to={"/accueilquiz"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 70,
            }}
          >
            Accueil
          </NavLink>
          <NavLink
            to={`/profil/${userId}`}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 70,
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
                  <DropdownItem href="/recapallusers">
                    Recap pour tous les utilisateurs
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button
                style={{
                  marginLeft: 15,
                  border: 0,
                  backgroundColor: "white",
                  color: "#6c757d",
                }}
                onClick={logoutAdmin}
              >
                Logout-Admin
              </Button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: 18,
                  cursor: "pointer",
                }}
                onClick={toggleModal}
              >
                Admin-Session
              </span>
            </>
          )}
        </div>
        <UncontrolledDropdown inNavbar>
          <DropdownToggle
            nav
            caret
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 110,
            }}
          >
            <img src="/image/avatar-profil-user.jpg" alt="." width={25} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <span style={{ fontSize: 13, color: "black" }}>
                Profil:
                <span
                  style={{
                    color: "red",
                    fontSize: 14,
                  }}
                >
                  {" "}
                  {userData?.username || adminuser?.username}
                </span>
              </span>
            </DropdownItem>
            <DropdownItem>
              <NavLink
                to={"#"}
                style={{
                  textDecoration: "none",
                  color: "#6c757d",
                }}
                onClick={logout}
              >
                Déconnexion
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>

      {isOpened ? (
        <Modal
          centered
          scrollable
          isOpen={isOpened}
          toggle={() => setIsOpened(false)}
        >
          <Form onSubmit={(e) => logina(e)}>
            <ModalHeader
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#6c757d",
              }}
            >
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
              <span
                className="modal-admin-closeicon"
                onClick={handelClose}
                style={{
                  position: "relative",
                  top: 0,
                  left: 460,
                  cursor: "pointer",
                  fontSize: 20,
                  color: "#6c757d",
                }}
              >
                X
              </span>
              <p
                className="modal-admin-title"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#6c757d",
                  fontSize: 20,
                }}
              >
                Admin-connecte
              </p>

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
                  style={{
                    position: "relative",
                    left: 435,
                    bottom: 38,
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  {eye}
                </i>
                <Label className="modal-admin-label-text" for="password">
                  Password
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className="modal-admin-button1"
                type="submit"
                disabled={!username || !password}
                style={{ border: 0 }}
              >
                Confirm
              </Button>
              <Button
                className="modal-admin-button2"
                onClick={handleReset}
                style={{ backgroundColor: "black", border: 0 }}
              >
                Annuler
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbard;
