import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../../@types/Question";
import { getQuestions } from "../../actions/Questions/action";
import { Button, Card, CardBody, CardHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import QuizResponse from "../../@types/QuizResponse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizPageQcmTest = () => {
  let { categ } = useParams();
  let { quizTy } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [questionsText, setQuestionsText] = useState<{ [key: string]: string }>(
    {}
  );
  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestions({ category: categ, quizType: quizTy }, (questionsData) => {
      if (!questionsData) {
        console.error("Les données des questions sont indéfinies.");
        return;
      }
      setQuestions(questionsData);
      const questionsTextData = questionsData.reduce((acc, q) => {
        if (q && q._id) {
          acc[q._id] = q.question;
        }
        return acc;
      }, {} as { [key: string]: string });
      setQuestionsText(questionsTextData);
      // Créez un tableau d'indices de questions
      const questionIndices = Array.from(
        { length: questionsData.length },
        (_, index) => index
      );
      // Mélangez le tableau d'indices
      for (let i = questionIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionIndices[i], questionIndices[j]] = [
          questionIndices[j],
          questionIndices[i],
        ];
      }
      // Sélectionnez les 10 premiers indices mélangés
      const selectedIndices = questionIndices.slice(0, 10);
      // Créez un tableau de questions basé sur les indices sélectionnés
      const shuffledQuestions = selectedIndices.map(
        (index) => questionsData[index]
      );
      setDisplayedQuestions(shuffledQuestions);
    });
  }, [categ, quizTy]);

  const handleRadioChange = (questionId: any, selectedAnswer: any) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const date = new Date();
  const formattedDateTime = date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const showToastMessage = () => {
    toast.warning(
      "Si vous pouvez jouer un autre Quiz il faut que déconnecter et reconnecter de nouveau!",
      { autoClose: 50000 }
    );
  };

  const handleSaveAnswers = () => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const userId = localStorage.getItem("user_id");

      if (userId) {
        const storedResponsesString = localStorage.getItem("quiz_responses");
        const previousResponses = storedResponsesString
          ? JSON.parse(storedResponsesString)
          : [];

        const quizResponses: QuizResponse[] = Object.keys(selectedAnswers).map(
          (questionId) => ({
            _id: questionId,
            quizType: quizTy ?? "",
            category: categ ?? "",
            question: questionsText[questionId] ?? "",
            value: selectedAnswers[questionId],
            correctionQuestion: "",
            note: 0,
            date: formattedDateTime ?? "",
          })
        );

        const allResponses = [...previousResponses, ...quizResponses];

        localStorage.setItem("quiz_responses", JSON.stringify(allResponses));

        axios
          .post(`${process.env.REACT_APP_API_URL}/user/saveanswers/${userId}`, {
            quizResponses: allResponses,
          })
          .then((response) => {
            console.log("Réponses enregistrées :", response.data);
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'enregistrement des réponses :",
              error
            );
          });
      } else {
        console.error(
          "ID de l'utilisateur manquant. L'utilisateur n'est pas connecté."
        );
      }
    } else {
      console.error(
        "Token d'authentification manquant. L'utilisateur n'est pas connecté."
      );
    }
    navigateto("/accueilquiz");
    showToastMessage();
  };

  const navigateto = useNavigate();
  const navigate = useNavigate();

  const middleIndex = Math.ceil(displayedQuestions.length / 2);
  const leftQuestions = displayedQuestions.slice(0, middleIndex);
  const rightQuestions = displayedQuestions.slice(middleIndex);

  return (
    <>
      <div
        className="background-app"
        style={{
          paddingBottom: 50,
        }}
      >
        <img
          src="/image/small-icons/fleche-gauche.png"
          alt="."
          width={38}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginLeft: 10, marginTop: 80 }}
        />
        <Card style={{ marginLeft: 50, marginRight: 50, border: 0 }}>
          <CardHeader
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              background:
                "linear-gradient(50deg,#00889b 0, #0088af 3.85%, #0088c2 7.69%, #0087d3 11.54%, #0086e3 15.38%, #0085f0 19.23%, #0083fa 23.08%, #0080ff 26.92%, #007cff 30.77%, #0076ff 34.62%, #0070ff 38.46%, #0068ff 42.31%, #005efc 46.15%, #5353f2 50%, #7f45e5 53.85%, #9d33d7 57.69%, #b418c6 61.54%, #c600b4 65.38%, #d400a0 69.23%, #de008d 73.08%, #e50078 76.92%, #e90064 80.77%, #ea0051 84.62%, #e8003d 88.46%, #e4002a 92.31%, #dd0013 96.15%, #d41100 100%)",
            }}
          >
            QCM - Quiz
          </CardHeader>
          <CardBody>
            <p
              className="animated-gradient-text2"
              style={{ textAlign: "center", fontSize: 20 }}
            >
              Il faut cocher une bonne réponse pour chaque question
            </p>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "48%" }}>
                {Array.isArray(leftQuestions) && leftQuestions.length ? (
                  leftQuestions.map((question) => (
                    <div
                      className="Questionstable-table-tbody"
                      key={question._id}
                    >
                      <p style={{ fontWeight: "bold" }}>*{question.question}</p>
                      <h6>Les réponses:</h6>
                      <label style={{ cursor: "pointer" }}>
                        <Input
                          type="radio"
                          name={`question_${question._id}`}
                          value={question.incorrect_answer1}
                          onChange={() =>
                            handleRadioChange(
                              question._id,
                              question.incorrect_answer1
                            )
                          }
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                        a. {question.incorrect_answer1}
                      </label>
                      <br />
                      <label style={{ cursor: "pointer" }}>
                        <Input
                          type="radio"
                          name={`question_${question._id}`}
                          value={question.correct_answer}
                          onChange={() =>
                            handleRadioChange(
                              question._id,
                              question.correct_answer
                            )
                          }
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                        b. {question.correct_answer}
                      </label>
                      <br />
                      <label style={{ cursor: "pointer" }}>
                        <Input
                          type="radio"
                          name={`question_${question._id}`}
                          value={question.incorrect_answer2}
                          onChange={() =>
                            handleRadioChange(
                              question._id,
                              question.incorrect_answer2
                            )
                          }
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                        c. {question.incorrect_answer2}
                      </label>
                      <br />
                      <br />
                    </div>
                  ))
                ) : (
                  <div>
                    <span
                      className="text-center"
                      style={{
                        position: "relative",
                        left: 460,
                        top: 100,
                        zIndex: 1,
                      }}
                    >
                      <FontAwesomeIcon icon={faBoxOpen} size="8x" />
                      <br />
                      Pas des données...
                    </span>
                  </div>
                )}
              </div>
              <hr
                style={{
                  width: 8,
                  height: 850,
                  margin: 0,
                  backgroundColor: "#6c757d",
                  marginRight: 50,
                }}
              />
              <div style={{ width: "48%" }}>
                {Array.isArray(rightQuestions) && rightQuestions.length ? (
                  rightQuestions.map((question) => (
                    <div
                      className="Questionstable-table-tbody"
                      key={question._id}
                    >
                      <p style={{ fontWeight: "bold" }}>*{question.question}</p>
                      <h6>Les réponses:</h6>
                      <label style={{ cursor: "pointer" }}>
                        <Input
                          type="radio"
                          name={`question_${question._id}`}
                          value={question.incorrect_answer1}
                          onChange={() =>
                            handleRadioChange(
                              question._id,
                              question.incorrect_answer1
                            )
                          }
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                        a. {question.incorrect_answer1}
                      </label>
                      <br />
                      <label style={{ cursor: "pointer" }}>
                        <Input
                          type="radio"
                          name={`question_${question._id}`}
                          value={question.correct_answer}
                          onChange={() =>
                            handleRadioChange(
                              question._id,
                              question.correct_answer
                            )
                          }
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                        b. {question.correct_answer}
                      </label>
                      <br />
                      <label style={{ cursor: "pointer" }}>
                        <Input
                          type="radio"
                          name={`question_${question._id}`}
                          value={question.incorrect_answer2}
                          onChange={() =>
                            handleRadioChange(
                              question._id,
                              question.incorrect_answer2
                            )
                          }
                          style={{ marginRight: 10, cursor: "pointer" }}
                        />
                        c. {question.incorrect_answer2}
                      </label>
                      <br />
                      <br />
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ marginBottom: 10 }}
            >
              <p
                className="animated-gradient-text3"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                Vous avez terminé le quiz. Bonne chance...
              </p>
              <Button
                className="animated-gradient-button-quiz"
                style={{ border: 0 }}
                onClick={handleSaveAnswers}
              >
                Enregistrer Vos Réponses
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default QuizPageQcmTest;
