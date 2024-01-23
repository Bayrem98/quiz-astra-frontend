import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/Users/action";
import { Link } from "react-router-dom";

interface Props {}

const RecapAllUsers = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <div className="background-app">
      <div
        className="users-table-container"
        style={{ paddingTop: 80, paddingLeft: 25, paddingRight: 25 }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <h3 style={{ color: "white", textAlign: "center" }}>
              Recap des Utilisateurs
            </h3>
          </div>
          <div style={{ marginRight: 200 }}>
            <Input
              type="text"
              placeholder="Chercher içi..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div>
            <Card style={{ width: 200, height: 110 }}>
              <CardHeader style={{ textAlign: "center" }}>
                <img
                  src="/image/small-icons/notification.png"
                  alt="."
                  width={20}
                  style={{ marginTop: -5, marginRight: 5 }}
                />
                Information
              </CardHeader>
              <CardBody>
                <div style={{ marginTop: -10, fontSize: 13 }}>
                  <span>*Quiz a 10 questions</span>
                  <br />
                  <span>/ : </span>
                  <span> pas de quiz disponible</span>
                  <br />
                  <span>/10 : </span>
                  <span>manque correction</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <br />
        <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 595 }}>
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>Nom d'utilisateur</th>
                <th>Quiz & Note-global</th>
                <th>Correcteur</th>
                <th style={{ textAlign: "center" }}>Voir</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users
                  .filter((user) =>
                    user.username.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td style={{ fontWeight: "bold" }}>
                        {user.quizResponses &&
                          user.quizResponses.length > 0 && (
                            <div key={user._id}>
                              {user.quizResponses[0]?.quizType}-
                              {user.quizResponses[0]?.category}
                              <br />
                              {user.quizResponses[10]?.quizType}-
                              {user.quizResponses[10]?.category}
                              <br />
                              {user.quizResponses[20]?.quizType}-
                              {user.quizResponses[20]?.category}
                            </div>
                          )}
                        {user.noteGlobal}/{user.quizResponses?.length}
                      </td>
                      <td>{user.correcteur}</td>
                      <td style={{ textAlign: "center" }}>
                        <ButtonGroup>
                          <Link to={`/recaponeuser/${user._id}`}>
                            <img
                              src="/image/small-icons/vues.png"
                              alt="."
                              width={60}
                            />
                          </Link>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                    <br />
                    Pas de données...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecapAllUsers;
