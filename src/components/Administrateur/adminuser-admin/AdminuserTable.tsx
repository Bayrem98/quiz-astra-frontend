import { useEffect, useState } from "react";
import { ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Adminuser from "../../../@types/Adminuser";
import { getAdminusers } from "../../../actions/Adminusers/action";
import AdminuserAdd from "./AdminuserAdd";
import AdminuserDelete from "./AdminuserDelete";

interface Props {}

const AdminusersTable = (props: Props) => {
  const [adminusers, setAdminusers] = useState<Adminuser[]>([]);

  useEffect(() => {
    getAdminusers(setAdminusers);
  }, []);

  return (
    <div
      className="users-table-container"
      style={{ marginTop: 50, marginLeft: 50, marginRight: 50 }}
    >
      <div className="d-flex justify-content-between">
        <h2>Tableau des Adminusers</h2>
        <AdminuserAdd refresh={() => getAdminusers(setAdminusers)} />
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
            {adminusers.length ? (
              adminusers.map((adminuser) => (
                <tr key={adminuser._id}>
                  <td>{adminuser.username}</td>
                  <td style={{ textAlign: "center" }}>
                    <ButtonGroup>
                      <AdminuserDelete
                        adminuser={adminuser}
                        refresh={() => getAdminusers(setAdminusers)}
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

export default AdminusersTable;
