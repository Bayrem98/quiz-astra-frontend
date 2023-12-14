import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionsTable from "./components/questions-admin/QuestionsTable";
import QuizPage from "./components/pages/QuizPage";
import Navbard from "./components/parts/Navbard";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import UsersTable from "./components/users-admin/UserTable";
import Profil from "./components/pages/Profil";
import AdminusersTable from "./components/adminuser-admin/AdminuserTable";
import Cookies from "js-cookie";
import AccueilQuiz from "./components/pages/AcceuilQuiz";
import Home from "./components/pages/Home";

enum WebsiteRoute {
  LOGIN = "/",
  HOME = "/home",
  HOME_QUIZ = "/accueilquiz",
  QUESTIONS_TABLE = "/questionstable",
  ADMINUSERS_TABLE = "/adminuserstable",
  USERS_TABLE = "/userstable",
  QUIZ_PAGE_CATEG = "/accueilquiz/quizpage/:categ",
  PROFIL = "/profil/:userId",
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
              <Route path={WebsiteRoute.HOME} element={<Home />} />
              <Route path={WebsiteRoute.HOME_QUIZ} element={<AccueilQuiz />} />
              <Route
                path={WebsiteRoute.QUIZ_PAGE_CATEG}
                element={<QuizPage />}
              />
              <Route path={WebsiteRoute.PROFIL} element={<Profil />} />
            </Routes>
          </div>
        </>
      )}

      {Cookies.get("access_token") && localStorage.getItem("access_token") && (
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
