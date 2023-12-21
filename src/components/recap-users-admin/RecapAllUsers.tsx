import React, { useEffect, useState } from "react";
import User from "../../@types/User";
import { getUsers } from "../../actions/Users/action";
import axios from "axios";
import { Table } from "reactstrap";

const RecapAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers(setUsers);
    handleShowAllAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowUserAnswers = (userId: string) => {
    axios
      .get(`http://localhost:3000/user/quizanswers/${userId}`)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, quizResponses: response.data.quizResponses }
              : user
          )
        );
      })
      .catch((error) => {
        console.error("Erreur lors de l'affichage des réponses :", error);
      });
  };

  const handleShowAllAnswers = () => {
    axios
      .get(`http://localhost:3000/user`)
      .then((response) => {
        setUsers(response.data);
        response.data.forEach((user: any) => handleShowUserAnswers(user._id));
      })
      .catch((error) => {
        console.error("Erreur lors de l'affichage des réponses :", error);
      });
  };

  return (
    <>
      <div className="">
        <h2 style={{ textAlign: "center", marginTop: 50 }}>
          Recap Tous Les Utilisateurs
        </h2>
        <br />
        <Table
          bordered
          hover
          responsive
          style={{ width: "90%", marginLeft: 60 }}
        >
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>QuizType</th>
              <th>Categorie</th>
              <th>Question</th>
              <th>Réponse</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, userIndex) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td
                    style={{ fontWeight: "bold", textAlign: "center" }}
                    rowSpan={user.quizResponses?.length || 1}
                  >
                    {user.username}
                  </td>
                </tr>
                {user.quizResponses && user.quizResponses.length > 0 ? (
                  user.quizResponses.map((response, responseIndex) => (
                    <tr key={responseIndex}>
                      <td>{response.quizType}</td>
                      <td>{response.category}</td>
                      <td>{response.question}</td>
                      <td>{response.value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      Aucune réponse de quiz disponible pour cet utilisateur.
                    </td>
                  </tr>
                )}
                {userIndex < users.length - 1 && (
                  <tr>
                    <td colSpan={5}>
                      <hr />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RecapAllUsers;
