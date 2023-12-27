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
      .get(`http://localhost:3000/user/quizanswers/${userId}`)
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
          src="/image/pngwing.com.png"
          alt="."
          width={40}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginLeft: 10, marginTop: 10 }}
        />
        <div
          className="d-flex justify-content-center"
          style={{ paddingBottom: 360 }}
        >
          <Card
            style={{
              width: "90%",
              backgroundColor: "lightgray",
              marginTop: 10,
              border: 0,
            }}
          >
            <CardHeader
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#6c757d",
              }}
            >
              Nom d'utilisateur: {userData?.username}
            </CardHeader>
            <CardBody>
              <h6>*Tous Vous Réponses de Quiz :</h6>
              <br />
              {quizResponses.length > 0 ? (
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>QuizType</th>
                      <th>Catégorie</th>
                      <th>Question</th>
                      <th>Réponse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizResponses.map((response, index) => (
                      <tr key={index}>
                        <td>{response.quizType}</td>
                        <td>{response.category}</td>
                        <td>{response.question}</td>
                        <td>{response.value}</td>
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
