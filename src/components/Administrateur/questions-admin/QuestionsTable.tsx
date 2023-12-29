import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Input, Table } from "reactstrap";
import Question from "../../../@types/Question";
import { getQuestions } from "../../../actions/Questions/action";
import QuestionAdd from "./QuestionAdd";
import QuestionDelete from "./QuestionDelete";
interface Props {}

const QuestionsTable = (props: Props) => {
  const [Questions, setQuestions] = useState<Question[]>([]); // form state for Questions.
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getQuestions(null, setQuestions); // aka setQuestions(data)
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/image/background-home.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div
          className="d-flex justify-content-between"
          style={{ paddingTop: 80, paddingLeft: 25, paddingRight: 25 }}
        >
          <h3 style={{ color: "white" }}>Liste des Questions</h3>
          <div className="">
            <Input
              type="text"
              placeholder="Chercher içi..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <QuestionAdd refresh={() => getQuestions(null, setQuestions)} />
        </div>
        <br />
        <div style={{ marginLeft: 50, marginRight: 50 }}>
          <Table bordered responsive hover style={{ overflowY: "auto" }}>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>QuizType</th>
                <th>Question</th>
                <th>correct_answer</th>
                <th>incorrect_answer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(Questions) && Questions.length ? (
                Questions.filter(
                  (question) =>
                    question.question
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    question.quizType
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    question.category
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                ).map((question) => (
                  <tr className="Questionstable-table-tbody" key={question._id}>
                    <td>{question.category}</td>
                    <td>{question.quizType}</td>
                    <td>{question.question}</td>
                    <td>{question.correct_answer}</td>
                    <td>
                      {question.incorrect_answer1}/-/
                      {question.incorrect_answer2}
                    </td>
                    <td>
                      <ButtonGroup>
                        <QuestionDelete
                          question={question}
                          refresh={() => getQuestions(null, setQuestions)}
                        />
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-5"
                    style={{ color: "#0e0e0ee7" }}
                  >
                    <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                    <br />
                    Pas des données...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default QuestionsTable;
