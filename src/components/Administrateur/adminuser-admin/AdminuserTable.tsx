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
          <h3 style={{ color: "white" }}>Tableau des Adminusers</h3>
          <AdminuserAdd refresh={() => getAdminusers(setAdminusers)} />
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
    </div>
  );
};

export default AdminusersTable;
