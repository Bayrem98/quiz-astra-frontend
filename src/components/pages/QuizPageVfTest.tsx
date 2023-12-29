import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../../@types/Question";
import { getQuestions } from "../../actions/Questions/action";
import { Button, Card, CardBody, CardHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import QuizResponse from "../../@types/QuizResponse";

const QuizPageVfTest = () => {
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
      // Stockez les textes des questions dans l'état
      const questionsTextData = questionsData.reduce((acc, q) => {
        if (q && q._id) {
          acc[q._id] = q.question;
        }
        return acc;
      }, {} as { [key: string]: string });

      setQuestionsText(questionsTextData);
      const shuffledQuestions = questionsData.sort(() => Math.random() - 0.5);
      setDisplayedQuestions(shuffledQuestions.slice(0, 5));
    });
  }, [categ, quizTy]);

  const handleRadioChange = (questionId: any, selectedAnswer: any) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSaveAnswers = () => {
    // Obtenez le token d'authentification depuis le stockage local
    const accessToken = localStorage.getItem("access_token");

    // Vérifiez si le token est disponible
    if (accessToken) {
      // Ajoutez le token dans l'en-tête de la requête
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Obtenez l'ID de l'utilisateur connecté (si disponible)
      const userId = localStorage.getItem("user_id");

      // Vérifiez si l'ID de l'utilisateur est disponible
      if (userId) {
        const storedResponsesString = localStorage.getItem("quiz_responses");
        const previousResponses = storedResponsesString
          ? JSON.parse(storedResponsesString)
          : [];

        const quizResponses: QuizResponse[] = Object.keys(selectedAnswers).map(
          (questionId) => ({
            _id: questionId, // ou générer un nouvel identifiant unique selon votre logique
            quizType: quizTy ?? "",
            category: categ ?? "",
            question: questionsText[questionId] ?? "", // Utilisez le texte de la question
            value: selectedAnswers[questionId],
            correctionQuestion: "",
            note: 0,
          })
        );

        // Ajoutez les nouvelles réponses aux réponses précédentes
        const allResponses = [...previousResponses, ...quizResponses];

        // Stockez toutes les réponses dans le stockage local
        localStorage.setItem("quiz_responses", JSON.stringify(allResponses));

        // Envoyez toutes les réponses avec l'ID de l'utilisateur
        axios
          .post(`http://localhost:3000/user/saveanswers/${userId}`, {
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
  };

  const navigateto = useNavigate();

  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/image/background-home.jpg)",
          backgroundSize: "cover",
          paddingBottom: 50,
        }}
      >
        <img
          src="/image/pngwing.com.png"
          alt="."
          width={40}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginLeft: 10, marginTop: 80 }}
        />
        <Card style={{ marginLeft: 180, marginRight: 180, border: 0 }}>
          <CardHeader
            style={{
              textAlign: "center",
              backgroundColor: "#6c757d",
              color: "white",
              fontSize: 20,
            }}
          >
            Vrai ou Faux - Quiz
          </CardHeader>
          <CardBody>
            <h5>Il faut cocher une bonne réponse pour chaque question</h5>
            <br />
            {Array.isArray(displayedQuestions) && displayedQuestions.length ? (
              displayedQuestions.map((question) => (
                <div className="Questionstable-table-tbody" key={question._id}>
                  <p>*{question.question}</p>
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
                  {/* Bouton radio pour la réponse correcte */}
                  <label style={{ cursor: "pointer" }}>
                    <Input
                      type="radio"
                      name={`question_${question._id}`}
                      value={question.correct_answer}
                      onChange={() =>
                        handleRadioChange(question._id, question.correct_answer)
                      }
                      style={{ marginRight: 10, cursor: "pointer" }}
                    />
                    b. {question.correct_answer}
                  </label>
                  <br />
                  <br />
                </div>
              ))
            ) : (
              <div>
                <span
                  className="text-center"
                  style={{ position: "relative", left: 400 }}
                >
                  <FontAwesomeIcon icon={faBoxOpen} size="8x" />
                  <br />
                  Pas des données...
                </span>
              </div>
            )}
            <div
              className="d-flex justify-content-between"
              style={{ marginBottom: 10 }}
            >
              <p style={{ fontWeight: "bold" }}>
                Vous avez terminer le quiz Bonne Chance...
              </p>
              <Button color="success" onClick={handleSaveAnswers}>
                Enregistrer Vos Réponses
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default QuizPageVfTest;
