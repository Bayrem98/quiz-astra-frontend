import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/Users/action";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface Props {}

const RecapAllUsers = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

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
        <h3 style={{ color: "white", textAlign: "center" }}>
          Recap des Utilisateurs
        </h3>
        <br />
        <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 260 }}>
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
                          <Button>
                            <FontAwesomeIcon
                              icon={faEye}
                              color="white"
                              beat
                              size="xl"
                            />
                          </Button>
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
    </div>
  );
};

export default RecapAllUsers;
