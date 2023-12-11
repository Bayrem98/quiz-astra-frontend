import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Question from "../../@types/Question";
import { deleteQuestions } from "../../actions/Questions/action";

interface BookDeletePropsType {
  question: Question;
  refresh: () => void;
}

const QuestionDelete = ({ question, refresh }: BookDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false); // form state for modal.

  const submit = () => {
    deleteQuestions(question, () => {
      refresh();
      setIsOpened(false);
    });
  };

  return (
    <>
      <button className="btn3-delete" onClick={() => setIsOpened(true)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
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
          Question Supprimer
        </ModalHeader>
        <ModalBody>vous les vous supprimer {question.question} ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={submit}>
            Confirme
          </Button>{" "}
          <Button onClick={() => setIsOpened(false)}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuestionDelete;
