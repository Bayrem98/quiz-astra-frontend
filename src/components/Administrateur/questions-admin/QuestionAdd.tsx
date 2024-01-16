import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { addquestion } from "../../../actions/Questions/action";

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
      <span onClick={() => setIsOpened(true)} style={{ cursor: "pointer" }}>
        <img src="/image/small-icons/bouton-ajouter.png" alt="." width={40} />
      </span>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalBody
          style={{
            background:
              "linear-gradient(50deg,#c1c1f5 0, #cabef2 3.33%, #d3bcee 6.67%, #dbbae9 10%, #e2b8e4 13.33%, #e9b6de 16.67%, #eeb5d7 20%, #f3b3d0 23.33%, #f6b3c9 26.67%, #f9b2c2 30%, #fab3bb 33.33%, #fab3b4 36.67%, #fab4ae 40%, #f8b5a7 43.33%, #f5b7a2 46.67%, #f2b99d 50%, #eebb99 53.33%, #e9bd96 56.67%, #e3c093 60%, #ddc292 63.33%, #d6c491 66.67%, #cfc792 70%, #c7c994 73.33%, #c0cb97 76.67%, #b8cd9a 80%, #b0ce9f 83.33%, #a8d0a4 86.67%, #a0d1aa 90%, #98d2b0 93.33%, #91d3b7 96.67%, #8ad4be 100%)",
          }}
        >
          <p style={{ fontSize: 20, color: "black" }}>Ajouter Question</p>
          <span
            className="addQuestion-modal-iconclose"
            onClick={() => setIsOpened(false)}
            style={{
              position: "absolute",
              right: 10,
              top: 5,
              color: "black",
              cursor: "pointer",
            }}
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
        <ModalFooter
          style={{
            background:
              "linear-gradient(50deg,#c1c1f5 0, #cabef2 3.33%, #d3bcee 6.67%, #dbbae9 10%, #e2b8e4 13.33%, #e9b6de 16.67%, #eeb5d7 20%, #f3b3d0 23.33%, #f6b3c9 26.67%, #f9b2c2 30%, #fab3bb 33.33%, #fab3b4 36.67%, #fab4ae 40%, #f8b5a7 43.33%, #f5b7a2 46.67%, #f2b99d 50%, #eebb99 53.33%, #e9bd96 56.67%, #e3c093 60%, #ddc292 63.33%, #d6c491 66.67%, #cfc792 70%, #c7c994 73.33%, #c0cb97 76.67%, #b8cd9a 80%, #b0ce9f 83.33%, #a8d0a4 86.67%, #a0d1aa 90%, #98d2b0 93.33%, #91d3b7 96.67%, #8ad4be 100%)",
          }}
        >
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            onClick={submit}
          >
            Confirme
          </Button>{" "}
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => setIsOpened(false)}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuestionAdd;
