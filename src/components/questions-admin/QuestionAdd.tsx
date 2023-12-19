import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { addquestion } from "../../actions/Questions/action";

interface QuestionAddPropsType {
  refresh: () => void;
}

const fieldss = [
  { key: "numerologie", name: "Numérologie" },
  { key: "astrologie", name: "Astrologie" },
  { key: "tarologie", name: "Tarologie" },
  { key: "culturegeneral", name: "Culture-général" },
];

const fields = [
  { key: "qcm", name: "QCM" },
  { key: "vraifaux", name: "Vrai ou Faux" },
  { key: "questionreponse", name: "Question/Reponse" },
];

const QuestionAdd = (props: QuestionAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [category, setCategory] = useState<string>(fieldss[0].key);
  const [quizType, setQuizType] = useState<string>(fields[0].key);
  const [question, setQuestion] = useState<string>("");
  const [correct_answer, setCorrect_answer] = useState<string>("");
  const [incorrect_answer1, setIncorrect_answer1] = useState<string>("");
  const [incorrect_answer2, setIncorrect_answer2] = useState<string>("");

  const submit = () => {
    const newQuestion = {
      category,
      quizType,
      question,
      correct_answer,
      incorrect_answer1,
      incorrect_answer2,
    };
    console.log(newQuestion);

    addquestion(newQuestion, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setCategory(fieldss[0].key);
    setQuizType(fields[0].key);
    setQuestion("");
    setCorrect_answer("");
    setIncorrect_answer1("");
    setIncorrect_answer2("");
  };

  return (
    <>
      <button className="addQuestionbutton" onClick={() => setIsOpened(true)}>
        <FontAwesomeIcon className="plus" icon={faAdd} color="black" />
      </button>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalBody>
          <p className="addQuestion-modal-title"></p>
          <span
            className="addQuestion-modal-iconclose"
            onClick={() => setIsOpened(false)}
          >
            X
          </span>
          <br />
          <Form>
            <FormGroup floating>
              <Input
                value={category}
                id="category"
                name="category"
                type="select"
                onChange={(e) => setCategory(e.target.value)}
              >
                {fieldss.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </Input>
              <Label className="addQuestion-modal-input-label" for="category">
                La categorie de la question
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={quizType}
                id="quizType"
                name="quizType"
                type="select"
                onChange={(e) => setQuizType(e.target.value)}
              >
                {fields.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </Input>
              <Label className="addQuestion-modal-input-label" for="quizType">
                La type de quiz
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={question}
                id="question"
                name="question"
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Label className="addQuestion-modal-input-label" for="question">
                Le question
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={correct_answer}
                id="correct_answer"
                name="correct_answer"
                type="text"
                onChange={(e) => setCorrect_answer(e.target.value)}
              />
              <Label
                className="addQuestion-modal-input-label"
                for="correct_answer"
              >
                La correct reponse
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={incorrect_answer1}
                id="incorrect_answer1"
                name="incorrect_answer1"
                type="text"
                onChange={(e) => setIncorrect_answer1(e.target.value)}
              />
              <Label className="addQuestion-modal-input-label">
                La faux reponse1
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={incorrect_answer2}
                id="incorrect_answer2"
                name="incorrect_answer2"
                type="text"
                onChange={(e) => setIncorrect_answer2(e.target.value)}
              />
              <Label className="addQuestion-modal-input-label">
                La faux reponse2
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className="addQuestion-modal-button1" onClick={submit}>
            Confirme
          </button>{" "}
          <button
            className="addQuestion-modal-button2"
            onClick={() => setIsOpened(false)}
          >
            Annuler
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuestionAdd;
