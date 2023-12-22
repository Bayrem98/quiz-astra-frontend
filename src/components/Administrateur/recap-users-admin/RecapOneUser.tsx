import { useEffect, useState } from "react";
import User from "../../../@types/User";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

const RecapOneUser = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [correction, setCorrection] = useState<string>("");
  const [note, setNote] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/quizanswers/${userId}`
        );
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

  const handelCorrectionResponses = () => {
    const updatedUser = { ...user, corrections: correction, note: note };

    axios
      .put(`http://localhost:3000/user/${userId}`, updatedUser)
      .then((response) => {
        console.log("Correction réponses :", response.data);
      })
      .catch((error) => {
        console.log("Erreur Correction :", error);
      });
  };

  return (
    <>
      <img
        src="/image/pngwing.com.png"
        alt="."
        width={40}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", marginLeft: 10 }}
      />
      <div
        className="d-flex justify-content-between"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <h2>Recap Tous Les Quiz pour {user && user.username}</h2>
        <Button onClick={handelCorrectionResponses}>Enregistrer</Button>
      </div>
      <br />
      {user && (
        <Table
          bordered
          hover
          responsive
          style={{ width: "95%", marginLeft: 20 }}
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
                      style={{ width: 150 }}
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
      )}
    </>
  );
};

export default RecapOneUser;
