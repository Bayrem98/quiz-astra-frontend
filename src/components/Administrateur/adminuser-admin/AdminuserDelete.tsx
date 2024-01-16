import { useState } from "react";
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
