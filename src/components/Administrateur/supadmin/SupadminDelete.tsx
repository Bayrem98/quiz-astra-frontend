import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Supadmin from "../../../@types/Supadmin";
import { deleteSupadmin } from "../../../actions/Supadmin/action";

interface SupadminDeletePropsType {
  supadmin: Supadmin;
  refresh: () => void;
}

const SupadminDelete = ({ supadmin, refresh }: SupadminDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const submit = () => {
    deleteSupadmin(supadmin, () => {
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
          Supprimer Sup-admin
        </ModalHeader>
        <ModalBody>Voulez-vous supprimer {supadmin.username} ?</ModalBody>
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

export default SupadminDelete;
