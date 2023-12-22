import { useEffect, useState } from "react";
import User from "../../../@types/User";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input, Table } from "reactstrap";

const RecapOneUser = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [correction, setCorrection] = useState<string>("");
  const [note, setNote] = useState<number>(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/quizanswers/${userId}`
        );
        console.log(response.data.data);
        setUser(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (
        <div>
          <h2 style={{ textAlign: "center", marginTop: 20 }}>
            Recap Tous Les Quiz pour {user && user.username}
          </h2>
          <Table
            bordered
            hover
            responsive
            style={{ width: "98%", marginLeft: 10 }}
          >
            <thead>
              <tr>
                <th>QuizType</th>
                <th>Categorie</th>
                <th>Question</th>
                <th>Réponse</th>
                <th>Correction</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {user.quizResponses && user.quizResponses.length > 0 ? (
                user.quizResponses.map((response, responseIndex) => (
                  <tr key={responseIndex}>
                    <td>{response.quizType}</td>
                    <td>{response.category}</td>
                    <td>{response.question}</td>
                    <td>{response.value}</td>
                    <td>
                      <Input
                        type="text"
                        style={{ width: 120 }}
                        onChange={(e) => setCorrection(e.target.value)}
                        value={response.correctionQuestion}
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        style={{ width: 40 }}
                        onChange={(e) => setNote(parseInt(e.target.value, 10))}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>Aucune réponse de quiz disponible.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default RecapOneUser;
