import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionsTable from "./components/questions-admin/QuestionsTable";
import QuizPage from "./components/pages/QuizPage";
import Navbard from "./components/parts/Navbard";
import { Route, Routes } from "react-router-dom";
import Accueil from "./components/pages/Acceuil";
import Login from "./components/pages/Login";
import UsersTable from "./components/users-admin/UserTable";
import Profil from "./components/pages/Profil";
import AdminusersTable from "./components/adminuser-admin/AdminuserTable";
import Cookies from "js-cookie";

enum WebsiteRoute {
  LOGIN = "/",
  HOME = "/acceuil",
  QUESTIONS_TABLE = "/questionstable",
  ADMINUSERS_TABLE = "/adminuserstable",
  USERS_TABLE = "/userstable",
  QUIZ_PAGE_CATEG = "/acceuil/quizpage/:categ",
  PROFIL = "/profil",
}

function App() {
  return (
    <>
      <Routes>
        <Route path={WebsiteRoute.LOGIN} element={<Login />} />
      </Routes>

      {localStorage.getItem("access_token") && (
        <>
          <Navbard />
          <div>
            <Routes>
              <Route path={WebsiteRoute.HOME} element={<Accueil />} />
              <Route
                path={WebsiteRoute.QUIZ_PAGE_CATEG}
                element={<QuizPage />}
              />
              <Route path={WebsiteRoute.PROFIL} element={<Profil />} />
            </Routes>
          </div>
        </>
      )}

      {Cookies.get("access_token") && (
        <>
          <Routes>
            <Route
              path={WebsiteRoute.QUESTIONS_TABLE}
              element={<QuestionsTable />}
            />
            <Route
              path={WebsiteRoute.ADMINUSERS_TABLE}
              element={<AdminusersTable />}
            />
            <Route path={WebsiteRoute.USERS_TABLE} element={<UsersTable />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
