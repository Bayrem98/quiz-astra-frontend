import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import User from "../../@types/User";
import { getUser } from "../../actions/Users/action";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profil = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [quizResponses, setQuizResponses] = useState<Array<any>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        getUser(userId, setUserData);
        await handleShowAnswers();
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleShowAnswers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/quizanswers/${userId}`)
      .then((response) => {
        setQuizResponses(response.data.quizResponses || []);
      })
      .catch((error) => {
        console.error("Erreur lors de l'affichage des réponses :", error);
      });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/image/background-home.jpg)",
          backgroundSize: "cover",
        }}
      >
        <img
          src="/image/small-icons/fleche-gauche.png"
          alt="."
          width={40}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginLeft: 10, marginTop: 80 }}
        />
        <div
          className="d-flex justify-content-center"
          style={{ paddingBottom: 560 }}
        >
          <Card
            style={{
              width: "90%",
              marginTop: 10,
              border: 0,
              background:
                "linear-gradient(50deg,#c1c1f5 0, #cabef2 3.33%, #d3bcee 6.67%, #dbbae9 10%, #e2b8e4 13.33%, #e9b6de 16.67%, #eeb5d7 20%, #f3b3d0 23.33%, #f6b3c9 26.67%, #f9b2c2 30%, #fab3bb 33.33%, #fab3b4 36.67%, #fab4ae 40%, #f8b5a7 43.33%, #f5b7a2 46.67%, #f2b99d 50%, #eebb99 53.33%, #e9bd96 56.67%, #e3c093 60%, #ddc292 63.33%, #d6c491 66.67%, #cfc792 70%, #c7c994 73.33%, #c0cb97 76.67%, #b8cd9a 80%, #b0ce9f 83.33%, #a8d0a4 86.67%, #a0d1aa 90%, #98d2b0 93.33%, #91d3b7 96.67%, #8ad4be 100%)",
            }}
          >
            <CardHeader
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <div className="d-flex justify-content-between">
                <div> Nom d'utilisateur: {userData?.username}</div>
                <div>
                  Note: {userData?.noteGlobal}/
                  {quizResponses && quizResponses.length}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <h6>*Tous Vous Quiz et Correction :</h6>
              <br />
              {quizResponses.length > 0 ? (
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>QuizType</th>
                      <th>Catégorie</th>
                      <th>Question</th>
                      <th>Réponse</th>
                      <th>Correction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizResponses.map((response, index) => (
                      <tr key={index}>
                        <td>{response.quizType}</td>
                        <td>{response.category}</td>
                        <td>{response.question}</td>
                        <td>{response.value}</td>
                        <td>{response.correctionQuestion}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Aucune réponse de quiz disponible.</p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profil;
