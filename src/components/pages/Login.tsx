import React, { ChangeEvent, useState } from "react";
import { faEye, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Alert } from "antd";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = (event: any) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/auth/login`, {
        username,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
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
    window.location.replace("/acceuil");
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
              style={{ height: 350, width: 350, marginTop: 170 }}
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

              <h2 style={{ color: "black", textAlign: "center" }}>
                Connectez-vous
              </h2>
              <Form onSubmit={(event) => login(event)}>
                <FormGroup style={{ paddingLeft: 95 }}>
                  <Label style={{ color: "black" }}>
                    <FontAwesomeIcon
                      icon={faUser}
                      beatFade
                      style={{ color: "#000000", marginRight: 5 }}
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
                      style={{ color: "#000000", marginRight: 5 }}
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
                    <span style={{ color: "black" }}>Valider</span>
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
