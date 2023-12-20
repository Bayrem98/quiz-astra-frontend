import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import User from "../../@types/User";
import { getUser } from "../../actions/Users/action";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profil = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        getUser(userId, setUser);
      }
      await handleShowAnswers();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleShowAnswers = () => {
    axios
      .get(`http://localhost:3000/user/quizanswers/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'affichage des réponses :", error);
      });
  };

  return user ? (
    <>
      <div className="d-flex justify-content-center">
        <Card
          style={{
            width: 800,
            height: "100%",
            backgroundColor: "lightgray",
            marginTop: 30,
          }}
        >
          <CardHeader style={{ textAlign: "center" }}>
            Nom d'utilisateur: {user.username}
          </CardHeader>
          <CardBody>
            <h6>*Tous Vous Réponses de Quiz :</h6>
            <br />
            {user.quizResponses && user.quizResponses.length > 0 ? (
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>QuizType</th>
                    <th>Categorie</th>
                    <th>Question</th>
                    <th>Réponse</th>
                  </tr>
                </thead>
                <tbody>
                  {user.quizResponses.map((response, index) => (
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
    </>
  ) : (
    <></>
  );
};

export default Profil;
