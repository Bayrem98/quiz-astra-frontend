import React, { ChangeEvent, useState } from "react";
import {
  faEye,
  faLock,
  faPersonCircleQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Alert } from "antd";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(true);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const generateRandomTokenValue = () => {
    const token = uuidv4();
    return token;
  };

  const token = generateRandomTokenValue();

  const toggleRole = () => {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  };

  const login = (event: any, isAdmin: boolean) => {
    event.preventDefault();

    const authEndpoint = isAdmin ? "logina" : "login";

    axios
      .post(`http://localhost:3000/auth/${authEndpoint}`, {
        username,
        password,
      })
      .then(({ data }) => {
        // Gérer le stockage en fonction de l'utilisateur
        localStorage.setItem("access_token", data.user.username);
        localStorage.setItem("user_id", data.user._id);

        // Pour les administrateurs, utilisez Cookies
        if (isAdmin) {
          Cookies.set(
            "access_token",
            token,
            { expires: 5 / 24 } // 1 heure (1/24 de la journée)
          );
        }

        window.location.reload();
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
    window.location.replace("/home");
  };

  const eye = <FontAwesomeIcon icon={faEye} />;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", height: "100vh" }}>
          <div style={{ flex: 1, padding: "20px" }}>
            <img
              src="/image/pngwing.com.png"
              alt="."
              style={{ height: 450, width: 450, marginTop: 135 }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 120,
            }}
          >
            <div
              className="card"
              style={{
                backgroundColor: "lightgray",
                width: 500,
                borderRadius: 20,
              }}
            >
              <br />
              {errorMessage && (
                <Alert
                  message=""
                  description={errorMessage}
                  type="error"
                  showIcon
                />
              )}
              <br />
              <h2 style={{ color: "black", textAlign: "center" }}>
                Connectez-vous
              </h2>
              <br />
              <Form onSubmit={(event) => login(event, isAdmin)}>
                <FormGroup style={{ paddingLeft: 95 }}>
                  <Label style={{ color: "black" }}>
                    <FontAwesomeIcon
                      icon={faPersonCircleQuestion}
                      beatFade
                      style={{ color: "#000000", marginRight: 8, fontSize: 20 }}
                    />
                    Choisir votre role
                  </Label>
                  <div className="d-flex justify-content-between">
                    <Input
                      type="select"
                      value={isAdmin ? "admin" : "user"}
                      onChange={toggleRole}
                      style={{ width: 300 }}
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </Input>
                  </div>
                </FormGroup>
                <FormGroup style={{ paddingLeft: 95 }}>
                  <Label style={{ color: "black" }}>
                    <FontAwesomeIcon
                      icon={faUser}
                      beatFade
                      style={{ color: "#000000", marginRight: 8 }}
                    />
                    Nom d'utilisateur
                  </Label>
                  <div className="d-flex justify-content-between">
                    <Input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      style={{ width: 300 }}
                    />
                  </div>
                </FormGroup>
                <FormGroup style={{ paddingLeft: 95 }}>
                  <Label style={{ color: "black" }}>
                    <FontAwesomeIcon
                      icon={faLock}
                      beatFade
                      style={{ color: "#000000", marginRight: 8 }}
                    />
                    Mot de passe
                  </Label>
                  <div className="d-flex justify-content-between">
                    <Input
                      value={password}
                      onChange={handlePasswordChange}
                      type={passwordShown ? "text" : "password"}
                      style={{ width: 300 }}
                    />
                    <Button
                      style={{
                        color: "black",
                        cursor: "pointer",
                        position: "relative",
                        right: 60,
                        backgroundColor: "beige",
                        border: 0,
                      }}
                      onClick={togglePasswordVisiblity}
                    >
                      {eye}
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup style={{ textAlign: "center" }}>
                  <Button
                    size="lg"
                    style={{ backgroundColor: "beige", cursor: "pointer" }}
                    type="submit"
                    disabled={!username || !password}
                  >
                    <span style={{ color: "black" }}>
                      Valider en tant que{" "}
                      {isAdmin ? "administrateur" : "utilisateur"}
                    </span>
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
