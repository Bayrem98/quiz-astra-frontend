import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

function Navbard() {
  return (
    <div>
      <Navbar className="my-2" color="secondary" dark>
        <NavbarBrand>Quiz-App</NavbarBrand>
        <div style={{ marginRight: 600 }}>
          <NavLink
            to={"/acceuil"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 100,
            }}
          >
            Accueil
          </NavLink>
          <NavLink
            to={"questionstable"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
              marginRight: 100,
            }}
          >
            Parametre-Admin
          </NavLink>
          <NavLink
            to={"#"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: 18,
            }}
          >
            Déconnexion
          </NavLink>
        </div>
      </Navbar>
    </div>
  );
}

export default Navbard;
