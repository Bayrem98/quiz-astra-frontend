import { useEffect, useState } from "react";
import { ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Supadmin from "../../../@types/Supadmin";
import { getSupadmins } from "../../../actions/Supadmin/action";
import SupadminAdd from "./SupadminAdd";
import SupadminDelete from "./SupadminDelete";

interface Props {}

const SupadminsTable = (props: Props) => {
  const [supadmins, setSupadmins] = useState<Supadmin[]>([]);

  useEffect(() => {
    getSupadmins(setSupadmins);
  }, []);

  return (
    <div className="background-app">
      <div
        className="users-table-container"
        style={{ paddingTop: 80, paddingLeft: 25, paddingRight: 25 }}
      >
        <div className="d-flex justify-content-between">
          <h3 style={{ color: "white" }}>Tableau des Sup-Admins</h3>
          <SupadminAdd refresh={() => getSupadmins(setSupadmins)} />
        </div>
        <br />
        <div style={{ marginLeft: 50, marginRight: 50, paddingBottom: 590 }}>
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>Nom de Sup-admin</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {supadmins.length ? (
                supadmins.map((supadmin) => (
                  <tr key={supadmin._id}>
                    <td>{supadmin.username}</td>
                    <td style={{ textAlign: "center" }}>
                      <ButtonGroup>
                        <SupadminDelete
                          supadmin={supadmin}
                          refresh={() => getSupadmins(setSupadmins)}
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

export default SupadminsTable;
