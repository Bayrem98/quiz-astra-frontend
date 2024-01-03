import { ChangeEvent, useEffect, useState } from "react";
import User from "../../../@types/User";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";
import QuizResponse from "../../../@types/QuizResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";

const RecapOneUser = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<User>();
  const [correction, setCorrection] = useState<{ [key: string]: string }>({});
  const [note, setNote] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/quizanswers/${userId}`
        );
        setUser(response.data);

        // Initialiser correction et note avec les valeurs stockées en local storage
        const storedCorrection = localStorage.getItem(`correction-${userId}`);
        const storedNote = localStorage.getItem(`note-${userId}`);

        const initialCorrection: { [key: string]: string } = storedCorrection
          ? JSON.parse(storedCorrection)
          : {};
        const initialNote: { [key: string]: number } = storedNote
          ? JSON.parse(storedNote)
          : {};

        let totalNote: number = 0; // Variable to store the sum of notes

        if (response.data && response.data.quizResponses) {
          response.data.quizResponses.forEach((response: QuizResponse) => {
            initialCorrection[response.question] =
              response.correctionQuestion ||
              initialCorrection[response.question] ||
              "";
            initialNote[response.question] =
              response.note || initialNote[response.question] || 0;
            totalNote += response.note || 0; // Add each note to the totalNote
          });
        }

        setCorrection(initialCorrection);
        setNote(initialNote);

        // Update the user object with the totalNote
        const updatedUser = {
          ...response.data,
          noteGlobal: totalNote,
        };
        setUser(updatedUser);
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
    if (!user || !user.quizResponses) {
      console.error("Les réponses de l'utilisateur ne sont pas disponibles.");
      return;
    }

    const totalNote = user.quizResponses.reduce(
      (sum, response) => sum + (note[response.question] || 0),
      0
    );

    const updatedUser = {
      ...user,
      noteGlobal: totalNote,
      quizResponses: user.quizResponses.map((response) => ({
        ...response,
        correctionQuestion: correction[response.question],
        note: note[response.question],
      })),
    };
    console.log(updatedUser);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/updateanswers/${userId}`,
        updatedUser
      )
      .then((response) => {
        console.log("Correction réponses :", response.data);
      })
      .catch((error) => {
        console.log("Erreur Correction :", error);
      });
      scheduleRefresh();
  };

  const refresh = () => {
    window.location.reload();
  };

  const scheduleRefresh = () => {
    setTimeout(() => {
      refresh();
    }, 10000); // 60000 millisecondes équivalent à 1 minute
  };

  const onCorrectionChange = (
    event: ChangeEvent<HTMLInputElement>,
    question: string
  ) => {
    const updatedCorrection = {
      ...correction,
      [question]: event.target.value,
    };
    setCorrection(updatedCorrection);
    localStorage.setItem(
      `correction-${userId}`,
      JSON.stringify(updatedCorrection)
    );
  };

  const onNoteChange = (
    event: ChangeEvent<HTMLInputElement>,
    question: string
  ) => {
    const inputValue = event.target.value;
    console.log("Input Value:", inputValue); // Debugging statement
    const updatedNote = {
      ...note,
      [question]: inputValue === "" ? 0 : parseInt(inputValue, 10),
    };
    console.log("Updated Note:", updatedNote); // Debugging statement
    setNote(updatedNote);
    localStorage.setItem(`note-${userId}`, JSON.stringify(updatedNote));
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
          style={{ cursor: "pointer", marginLeft: 10, marginTop: 70 }}
        />
        <div
          className="d-flex justify-content-between"
          style={{ marginLeft: 20, marginRight: 20 }}
        >
          <h3 style={{ color: "white" }}>
            Recap Tous Les Quiz pour{" "}
            <span style={{ color: "red", textDecoration: "underline" }}>
              {user._id && user.username}
            </span>
          </h3>
          <span style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
            Score: {user.noteGlobal}/
            {user.quizResponses && user.quizResponses.length}-(Nombre des
            questions)
          </span>
          <Button onClick={handelCorrectionResponses}>
            <FontAwesomeIcon icon={faSave} color="white" beatFade size="2xl" />
          </Button>
        </div>
        <br />
        <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 570 }}>
          {user && (
            <Table bordered hover responsive>
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
                          value={correction[response.question] || ""}
                          onChange={(e) =>
                            onCorrectionChange(e, response.question)
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          style={{ width: 40 }}
                          value={note[response.question] || ""}
                          onChange={(e) => onNoteChange(e, response.question)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>Aucune réponse de quiz disponible.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default RecapOneUser;
