import { useEffect, useState } from "react";
import { ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import UserDelete from "./UserDelete";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/Users/action";
import UserAdd from "./UserAdd";

interface Props {}

const UsersTable = (props: Props) => {
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
        className="d-flex justify-content-between"
        style={{ paddingTop: 80, paddingLeft: 25, paddingRight: 25 }}
      >
        <h3 style={{ color: "white" }}>Tableau des Utilisateurs</h3>
        <UserAdd refresh={() => getUsers(setUsers)} />
      </div>
      <br />
      <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 590 }}>
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
                      <UserDelete
                        user={user}
                        refresh={() => getUsers(setUsers)}
                      />
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

export default UsersTable;
