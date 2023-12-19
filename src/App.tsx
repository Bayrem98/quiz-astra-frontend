import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionsTable from "./components/questions-admin/QuestionsTable";
import Navbard from "./components/parts/Navbard";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import UsersTable from "./components/users-admin/UserTable";
import Profil from "./components/pages/Profil";
import AdminusersTable from "./components/adminuser-admin/AdminuserTable";
import Cookies from "js-cookie";
import AccueilQuiz from "./components/pages/AcceuilQuiz";
import Home from "./components/pages/Home";
import QuizPageQcmTest from "./components/pages/QuizPageQcmTest";
import QuizPageVfTest from "./components/pages/QuizPageVfTest";
import QuizPageQrTest from "./components/pages/QuizPageQrTest";
import RecapAllUsers from "./components/recap-users-admin/RecapAllUsers";

enum WebsiteRoute {
  LOGIN = "/",
  HOME = "/home",
  HOME_QUIZ = "/accueilquiz",
  QUESTIONS_TABLE = "/questionstable",
  ADMINUSERS_TABLE = "/adminuserstable",
  USERS_TABLE = "/userstable",
  QUIZ_PAGE_CATEG1 = "/accueilquiz/quizpageqcmtest/:categ/:quizTy",
  QUIZ_PAGE_CATEG2 = "/accueilquiz/quizpagevftest/:categ/:quizTy",
  QUIZ_PAGE_CATEG3 = "/accueilquiz/quizpageqrtest/:categ/:quizTy",
  PROFIL = "/profil/:userId",
  RECAP_ALL_USERS = "/recapallusers",
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
                path={WebsiteRoute.QUIZ_PAGE_CATEG1}
                element={<QuizPageQcmTest />}
              />
              <Route
                path={WebsiteRoute.QUIZ_PAGE_CATEG2}
                element={<QuizPageVfTest />}
              />
              <Route
                path={WebsiteRoute.QUIZ_PAGE_CATEG3}
                element={<QuizPageQrTest />}
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
            <Route
              path={WebsiteRoute.RECAP_ALL_USERS}
              element={<RecapAllUsers />}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
