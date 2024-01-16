import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
} from "reactstrap";

import Cookies from "js-cookie";
import User from "../../@types/User";
import { getUser } from "../../actions/Users/action";
import Adminuser from "../../@types/Adminuser";
import { getAdminuser } from "../../actions/Adminusers/action";
import Supadmin from "../../@types/Supadmin";
import { getSupadmin } from "../../actions/Supadmin/action";

function Navbard() {
  const [userData, setUserData] = useState<User | null>(null);
  const [adminuser, setAdminuser] = useState<Adminuser | null>(null);
  const [supAdmin, setSupAdmin] = useState<Supadmin | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUser(userId, setUserData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId) {
      getAdminuser(userId, setAdminuser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId) {
      getSupadmin(userId, setSupAdmin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("quiz_responses");
    Cookies.remove("access_token");
    navigate("/");
    window.location.reload();
  };

  const userId = localStorage.getItem("user_id");

  return (
    <>
      <Navbar
        dark
        style={{
          position: "fixed",
          top: 0,
          zIndex: 999,
          width: "100%",
          background:
            "linear-gradient(50deg,#6e383a 0, #6e3935 6.25%, #6c3a31 12.5%, #6a3c2c 18.75%, #683e29 25%, #653f25 31.25%, #614123 37.5%, #5d4320 43.75%, #59451f 50%, #54471e 56.25%, #50481e 62.5%, #4b4a1f 68.75%, #454b21 75%, #404d23 81.25%, #3a4e26 87.5%, #344f2a 93.75%, #2d502e 100%)",
        }}
      >
        <NavbarBrand href="/home">
          <img src="/image/pngwing.com.png" alt="." width={30} />
          Quiz-App</NavbarBrand>
        <div className="d-flex justify-content" style={{ marginRight: 300 }}>
          <NavLink
            to={"/accueilquiz"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 150,
            }}
          >
            <img src="/image/small-icons/accueil.png" alt="." width={35} />
            Accueil
          </NavLink>

          {userData && (
            <NavLink
              to={`/profil/${userId}`}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 18,
                marginRight: 150,
              }}
            >
              Profil
            </NavLink>
          )}

          {Cookies.get("access_token") ? (
            <>
              <UncontrolledDropdown inNavbar>
                <DropdownToggle
                  nav
                  caret
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  <img
                    src="/image/small-icons/parametres.png"
                    alt="."
                    width={35}
                  />
                  Paramétres
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/questionstable">
                    Ajouter Des Questions
                  </DropdownItem>
                  {supAdmin && (
                    <div>
                      <DropdownItem href="/supadmintable">
                        Ajouter Des Sup-Admin
                      </DropdownItem>
                      <DropdownItem href="/adminuserstable">
                        Ajouter Des Formateurs
                      </DropdownItem>
                    </div>
                  )}
                  <DropdownItem href="/userstable">
                    Ajouter Des Voyants
                  </DropdownItem>
                  <DropdownItem href="/recapallusers">
                    Recap pour tous les Voyants
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) : (
            <></>
          )}
        </div>
        <UncontrolledDropdown inNavbar>
          <DropdownToggle
            nav
            caret
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 10,
            }}
          >
            <img
              src="/image/small-icons/rapport-de-donnees.png"
              alt="."
              width={38}
            />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>
              <span>
                <img
                  src="/image/small-icons/utilisateur.png"
                  alt="."
                  width={30}
                />
                <span
                  className="animated-gradient-text2"
                  style={{
                    fontSize: 15,
                  }}
                >
                  {" "}
                  {userData?.username ||
                    adminuser?.username ||
                    supAdmin?.username}
                </span>
              </span>
            </DropdownItem>
            <DropdownItem>
              <NavLink
                to={"#"}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                onClick={logout}
              >
                <span>
                  <img
                    src="/image/small-icons/se-deconnecter.png"
                    alt="."
                    width={33}
                  />
                </span>
                Déconnexion
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
    </>
  );
}

export default Navbard;
