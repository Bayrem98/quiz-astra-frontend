import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import User from "../../@types/User";
import { getUser } from "../../actions/Users/action";
import QuizResponse from "../../@types/QuizResponse";
import { useParams } from "react-router-dom";

const fields = [
  { key: "qcm", name: "QCM" },
  { key: "vraifaux", name: "Vrai ou Faux" },
  { key: "questionreponse", name: "Question/Reponse" },
];

const Profil = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (userId) {
      getUser(userId, setUser);
    }
  }, [userId]);

  return user ? (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          paddingTop: 80,
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 80,
          backgroundColor: "silver",
        }}
      >
        <div>
          <Card style={{ width: 500, height: "100%" }}>
            <CardHeader style={{ textAlign: "center" }}>
              Nom d'utilisateur: {user.username}
            </CardHeader>
            <CardBody>
              {fields.map((field) => (
                <div key={field.key}>
                  <h6>*Les notes de quizz pour type {field.name} :</h6>
                  <ul style={{ padding: 30 }}>
                    {user.quizResponses &&
                      user.quizResponses
                        .filter(
                          (response: QuizResponse) =>
                            response.quizType === field.key
                        )
                        .map(
                          (filteredResponse: QuizResponse, index: number) => (
                            <li key={index}>{filteredResponse.value} </li>
                          )
                        )}
                  </ul>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Profil;
