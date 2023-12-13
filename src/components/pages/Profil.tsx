import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import User from "../../@types/User";
import { getUser } from "../../actions/Users/action";
import { useParams } from "react-router-dom";

const Profil = () => {
  let { userId } = useParams();
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
              <div>
                <h6>*Les notes de quizz pour type QCM:</h6>
                <ul style={{ padding: 30 }}>
                  <li>Astrologie</li>
                  <br />
                  <li>Numérologie</li>
                  <br />
                  <li>Tarologie</li>
                  <br />
                  <li>Culture-Général</li>
                </ul>
              </div>
              <div>
                <h6>*Les notes de quizz pour type Vrai ou Faux:</h6>
                <ul style={{ padding: 30 }}>
                  <li>Astrologie</li>
                  <br />
                  <li>Numérologie</li>
                  <br />
                  <li>Tarologie</li>
                  <br />
                  <li>Culture-Général</li>
                </ul>
              </div>
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
