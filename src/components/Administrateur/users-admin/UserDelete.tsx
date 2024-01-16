import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import User from "../../../@types/User";
import { deleteUser } from "../../../actions/Users/action";

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
      <span onClick={() => setIsOpened(true)} style={{ cursor: "pointer" }}>
        <img src="/image/small-icons/supprimer.png" alt="." width={40} />
      </span>
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
