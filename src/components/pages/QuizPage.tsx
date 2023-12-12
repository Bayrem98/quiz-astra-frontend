import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../../@types/Question";
import { getQuestions } from "../../actions/Questions/action";
import { Button, Card, CardBody, CardHeader } from "reactstrap";

const QuizPage = () => {
  let { categ } = useParams();
  const [Questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    getQuestions({ category: categ }, setQuestions);
  }, [categ]);

  const handleRadioChange = (questionId: any, selectedAnswer: any) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSaveAnswers = () => {
    // Vous pouvez ajouter la logique pour enregistrer les réponses ici
    console.log("Réponses enregistrées :", selectedAnswers);
  };

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            Test-QCM: Il faut cocher la bonne réponse pour chaque question.
          </CardHeader>
          <CardBody>
            {Array.isArray(Questions) && Questions.length ? (
              Questions.map((question) => (
                <div className="Questionstable-table-tbody" key={question._id}>
                  <p>*-{question.question}</p>
                  <h6>Les réponses:</h6>
                  {/* Bouton radio pour la première réponse incorrecte */}
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={question.incorrect_answer1}
                      onChange={() =>
                        handleRadioChange(
                          question._id,
                          question.incorrect_answer1
                        )
                      }
                    />
                    {question.incorrect_answer1}
                  </label>
                  <br />
                  {/* Bouton radio pour la réponse correcte */}
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={question.correct_answer}
                      onChange={() =>
                        handleRadioChange(question._id, question.correct_answer)
                      }
                    />
                    {question.correct_answer}
                  </label>
                  <br />
                  {/* Bouton radio pour la deuxième réponse incorrecte */}
                  <label>
                    <input
                      type="radio"
                      name={`question_${question._id}`}
                      value={question.incorrect_answer2}
                      onChange={() =>
                        handleRadioChange(
                          question._id,
                          question.incorrect_answer2
                        )
                      }
                    />
                    {question.incorrect_answer2}
                  </label>
                  <br />
                  <br />
                </div>
              ))
            ) : (
              <div>
                <p className="text-center p-5" style={{ color: "#0e0e0ee7" }}>
                  No data in table...
                </p>
              </div>
            )}
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
export default QuizPage;
