import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Adminuser from "../../../@types/Adminuser";
import { deleteAdminuser } from "../../../actions/Adminusers/action";

interface AdminuserDeletePropsType {
  adminuser: Adminuser;
  refresh: () => void;
}

const AdminuserDelete = ({ adminuser, refresh }: AdminuserDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const submit = () => {
    deleteAdminuser(adminuser, () => {
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
          Supprimer Adminuser
        </ModalHeader>
        <ModalBody>Voulez-vous supprimer {adminuser.username} ?</ModalBody>
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

export default AdminuserDelete;
