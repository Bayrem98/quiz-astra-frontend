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

  useEffect(() => {
    getQuestions({ category: categ, quizType: quizTy }, setQuestions);
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
            quizType: quizTy,
            category: categ,
            question: questionId, // Assurez-vous que questionId est correct
            value: selectedAnswers[questionId],
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
      <div style={{ marginLeft: 30, marginRight: 30, marginTop: 10 }}>
        <img
          src="/image/pngwing.com.png"
          alt="."
          width={40}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <Card>
          <CardHeader style={{ textAlign: "center" }}>
            Test-Question et reponse: Il faut repondre dans la case pour chaque
            question.
          </CardHeader>
          <CardBody>
            {Array.isArray(questions) && questions.length ? (
              questions.map((question) => (
                <div className="Questionstable-table-tbody" key={question._id}>
                  <p>*-{question.question}</p>
                  <h6>La réponse:</h6>
                  {/* Bouton radio pour la réponse correcte */}
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
            <br />
            {/* Bouton d'enregistrement des réponses */}
            <Button color="primary" onClick={handleSaveAnswers}>
              Enregistrer les réponses
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default QuizPageQrTest;
