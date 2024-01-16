import { useEffect, useState } from "react";
import { ButtonGroup, Input, Table } from "reactstrap";
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
    <div
      style={{
        backgroundImage: "url(/image/background-home.jpg)",
        backgroundSize: "cover",
      }}
    >
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
        </div>
        <br />
        <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 595 }}>
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>Nom d'utilisateur</th>
                <th>Note-global</th>
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
                        {user.noteGlobal}/{user.quizResponses?.length}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <ButtonGroup>
                          <Link to={`/recaponeuser/${user._id}`}>
                            <img src="/image/small-icons/vues.png" alt="." width={60} />
                          </Link>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                    <br />
                    Pas des données...
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
