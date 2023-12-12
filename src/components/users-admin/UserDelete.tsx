import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import User from "../../@types/User";
import { deleteUser } from "../../actions/Users/action";

interface UserDeletePropsType {
  user: User;
  refresh: () => void;
}

const UserDelete = ({ user, refresh }: UserDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const submit = () => {
    deleteUser(user, () => {
      refresh();
      setIsOpened(false);
    });
  };

  return (
    <>
      <Button
        className="btn3-delete"
        color="danger"
        onClick={() => setIsOpened(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Modal
        className="font-['Helvetica']"
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader
          className="bg-danger text-white"
          toggle={() => setIsOpened(!isOpened)}
        >
          Supprimer Utilisateur
        </ModalHeader>
        <ModalBody>Voulez-vous supprimer {user.username} ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={submit}>
            Valider
          </Button>{" "}
          <Button onClick={() => setIsOpened(false)}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserDelete;
