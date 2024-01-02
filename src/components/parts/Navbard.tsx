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

function Navbard() {
  const [userData, setUserData] = useState<User | null>(null);
  const [adminuser, setAdminuser] = useState<Adminuser | null>(null);
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
        color="secondary"
        dark
        style={{ position: "fixed", top: 0, zIndex: 999, width: "100%" }}
      >
        <NavbarBrand href="/home">Quiz-App</NavbarBrand>
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
                  Paramétre-Admin
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/questionstable">
                    Ajouter Des Questions
                  </DropdownItem>
                  <DropdownItem href="/supadmintable">
                    Ajouter Des Sup-Admin
                  </DropdownItem>
                  <DropdownItem href="/adminuserstable">
                    Ajouter Des Formateurs
                  </DropdownItem>
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
            <img src="/image/avatar-profil-user.jpg" alt="." width={25} />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>
              <span style={{ fontSize: 13, color: "black" }}>
                Profil:
                <span
                  style={{
                    color: "red",
                    fontSize: 14,
                  }}
                >
                  {" "}
                  {userData?.username || adminuser?.username}
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
