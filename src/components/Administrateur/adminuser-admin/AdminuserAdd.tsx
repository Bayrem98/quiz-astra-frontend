import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { addAdminuser } from "../../../actions/Adminusers/action";

interface AdminuserAddPropsType {
  refresh: () => void;
}
const AdminuserAdd = (props: AdminuserAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submit = () => {
    const newAdminuser = {
      username,
      password,
    };
    addAdminuser(newAdminuser, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setUsername("");
    setPassword("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  const eye = <FontAwesomeIcon icon={faEye} />;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <span onClick={() => setIsOpened(true)} style={{ cursor: "pointer" }}>
        <img
          src="/image/small-icons/ajouter-un-utilisateur.png"
          alt="."
          width={40}
        />
      </span>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader
          style={{
            background:
              "linear-gradient(50deg,#c1c1f5 0, #cabef2 3.33%, #d3bcee 6.67%, #dbbae9 10%, #e2b8e4 13.33%, #e9b6de 16.67%, #eeb5d7 20%, #f3b3d0 23.33%, #f6b3c9 26.67%, #f9b2c2 30%, #fab3bb 33.33%, #fab3b4 36.67%, #fab4ae 40%, #f8b5a7 43.33%, #f5b7a2 46.67%, #f2b99d 50%, #eebb99 53.33%, #e9bd96 56.67%, #e3c093 60%, #ddc292 63.33%, #d6c491 66.67%, #cfc792 70%, #c7c994 73.33%, #c0cb97 76.67%, #b8cd9a 80%, #b0ce9f 83.33%, #a8d0a4 86.67%, #a0d1aa 90%, #98d2b0 93.33%, #91d3b7 96.67%, #8ad4be 100%)",
          }}
          toggle={() => setIsOpened(!isOpened)}
        >
          <span>Ajouter Formateur</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Nom de Formateur</Label>
              <Input
                value={username}
                id="username"
                name="username"
                type="text"
                onChange={handleUsernameChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Mot de passe</Label>
              <div className="d-flex justify-content-between">
                <Input
                  value={password}
                  id="password"
                  name="password"
                  onChange={handlePasswordChange}
                  type={passwordShown ? "text" : "password"}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  style={{
                    color: "black",
                    cursor: "pointer",
                    backgroundColor: "#ddd9d5",
                    border: 0,
                  }}
                  onClick={togglePasswordVisiblity}
                >
                  {eye}
                </Button>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter
          style={{
            background:
              "linear-gradient(50deg,#c1c1f5 0, #cabef2 3.33%, #d3bcee 6.67%, #dbbae9 10%, #e2b8e4 13.33%, #e9b6de 16.67%, #eeb5d7 20%, #f3b3d0 23.33%, #f6b3c9 26.67%, #f9b2c2 30%, #fab3bb 33.33%, #fab3b4 36.67%, #fab4ae 40%, #f8b5a7 43.33%, #f5b7a2 46.67%, #f2b99d 50%, #eebb99 53.33%, #e9bd96 56.67%, #e3c093 60%, #ddc292 63.33%, #d6c491 66.67%, #cfc792 70%, #c7c994 73.33%, #c0cb97 76.67%, #b8cd9a 80%, #b0ce9f 83.33%, #a8d0a4 86.67%, #a0d1aa 90%, #98d2b0 93.33%, #91d3b7 96.67%, #8ad4be 100%)",
          }}
        >
          <Button
            style={{
              backgroundColor: "#ddd9d5",
              border: 0,
              color: "black",
              borderRadius: 10,
            }}
            onClick={submit}
          >
            Valider
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              border: 0,
              borderRadius: 10,
            }}
            onClick={() => setIsOpened(false)}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminuserAdd;
