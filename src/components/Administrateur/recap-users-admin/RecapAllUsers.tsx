import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/Users/action";
import { Link } from "react-router-dom";

interface Props {}

const RecapAllUsers = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <div
      className="users-table-container"
      style={{ marginTop: 50, marginLeft: 50, marginRight: 50 }}
    >
      <div className="d-flex justify-content-between">
        <h2>Recap des Utilisateurs</h2>
      </div>
      <br />
      <div>
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td style={{ textAlign: "center" }}>
                    <ButtonGroup>
                      <Link to={`/recaponeuser/${user._id}`}>
                        <Button>Voir-Recap</Button>
                      </Link>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center">
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
  );
};

export default RecapAllUsers;
