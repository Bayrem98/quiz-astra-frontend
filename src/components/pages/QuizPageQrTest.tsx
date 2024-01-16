import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../../@types/Question";
import { getQuestions } from "../../actions/Questions/action";
import { Button, Card, CardBody, CardHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import QuizResponse from "../../@types/QuizResponse";

const QuizPageQrTest = () => {
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
           src="/image/small-icons/fleche-gauche.png"
           alt="."
           width={38}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginLeft: 10, marginTop: 80 }}
        />
        <Card style={{ marginLeft: 180, marginRight: 180, border: 0 }}>
          <CardHeader
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              background:
                "linear-gradient(50deg,#00889b 0, #0088af 3.85%, #0088c2 7.69%, #0087d3 11.54%, #0086e3 15.38%, #0085f0 19.23%, #0083fa 23.08%, #0080ff 26.92%, #007cff 30.77%, #0076ff 34.62%, #0070ff 38.46%, #0068ff 42.31%, #005efc 46.15%, #5353f2 50%, #7f45e5 53.85%, #9d33d7 57.69%, #b418c6 61.54%, #c600b4 65.38%, #d400a0 69.23%, #de008d 73.08%, #e50078 76.92%, #e90064 80.77%, #ea0051 84.62%, #e8003d 88.46%, #e4002a 92.31%, #dd0013 96.15%, #d41100 100%)",
            }}
          >
            Question et Réponse - Quiz
          </CardHeader>
          <CardBody>
            <p
              className="animated-gradient-text2"
              style={{ textAlign: "center", fontSize: 20 }}
            >
              Il faut répondre a ces questions
            </p>
            <br />
            {Array.isArray(displayedQuestions) && displayedQuestions.length ? (
              displayedQuestions.map((question) => (
                <div className="Questionstable-table-tbody" key={question._id}>
                  <p>*{question.question}</p>
                  <h6>La réponse:</h6>
                  <label>
                    <Input
                      type="textarea"
                      name={`question_${question._id}`}
                      onChange={(e) =>
                        handleRadioChange(question._id, e.target.value)
                      }
                      style={{ width: 500 }}
                    />
                  </label>
                  <br />
                  <br />
                </div>
              ))
            ) : (
              <div>
                <span
                  className="text-center"
                  style={{ position: "relative", left: 380 }}
                >
                  <FontAwesomeIcon icon={faBoxOpen} size="6x" />
                  <br />
                  Pas des données...
                </span>
              </div>
            )}
            <br />
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
export default QuizPageQrTest;
