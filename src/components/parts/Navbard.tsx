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
            "linear-gradient(50deg,#c1c1f5 0, #cabef2 3.33%, #d3bcee 6.67%, #dbbae9 10%, #e2b8e4 13.33%, #e9b6de 16.67%, #eeb5d7 20%, #f3b3d0 23.33%, #f6b3c9 26.67%, #f9b2c2 30%, #fab3bb 33.33%, #fab3b4 36.67%, #fab4ae 40%, #f8b5a7 43.33%, #f5b7a2 46.67%, #f2b99d 50%, #eebb99 53.33%, #e9bd96 56.67%, #e3c093 60%, #ddc292 63.33%, #d6c491 66.67%, #cfc792 70%, #c7c994 73.33%, #c0cb97 76.67%, #b8cd9a 80%, #b0ce9f 83.33%, #a8d0a4 86.67%, #a0d1aa 90%, #98d2b0 93.33%, #91d3b7 96.67%, #8ad4be 100%)",
        }}
      >
        <NavbarBrand href="/home">
          <img src="/image/pngwing.com.png" alt="." width={30} />
          Quiz-App
        </NavbarBrand>
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
              <img src="/image/small-icons/examen.png" alt="." width={36} />
              Correction Quiz
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
              fontSize: 20,
              marginRight: 10,
            }}
          >
            <img
              src="/image/small-icons/rapport-de-donnees.png"
              alt="."
              width={38}
            />
            <span style={{ fontSize: 18 }}>Compte</span>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>
              <span>
                <img
                  src="/image/small-icons/utilisateur.png"
                  alt="."
                  width={32}
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
                to={"/notifications"}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <span className="">
                  <img
                    src="/image/small-icons/notification.png"
                    alt="."
                    width={33}
                  />
                </span>
                Notification
              </NavLink>
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
                    width={34}
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
