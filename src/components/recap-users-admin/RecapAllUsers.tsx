import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import User from "../../@types/User";
import Question from "../../@types/Question";
import { getUsers } from "../../actions/Users/action";

const RecapAllUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [questions, setQuestions] = useState<Question[]>();

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <>
      <div className="">
        <h2 style={{ textAlign: "center", marginTop: 50 }}>
          Recap Tous Les Utilisateurs
        </h2>
        <br />
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Types quiz</th>
              <th>Catégorie quiz</th>
              <th>Notes</th>
              <th>Voir les tests</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RecapAllUsers;
