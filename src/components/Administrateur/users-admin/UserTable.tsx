import { useEffect, useState } from "react";
import { ButtonGroup, Input, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import UserDelete from "./UserDelete";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/Users/action";
import UserAdd from "./UserAdd";

interface Props {}

const UsersTable = (props: Props) => {
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
        className="d-flex justify-content-between"
        style={{ paddingTop: 80, paddingLeft: 25, paddingRight: 25 }}
      >
        <h3 style={{ color: "white" }}>Tableau des Voyants</h3>
        <div className="">
          <Input
            type="text"
            placeholder="Chercher içi..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <UserAdd refresh={() => getUsers(setUsers)} />
      </div>
      <br />
      <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 420 }}>
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>Pseudo</th>
              <th style={{ textAlign: "center" }}>Action</th>
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
