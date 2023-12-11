import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionsTable from "./components/questions-admin/QuestionsTable";
import QuizPage from "./components/pages/QuizPage";
import Navbard from "./components/parts/Navbard";
import { Route, Routes } from "react-router-dom";
import Accueil from "./components/pages/Acceuil";
import Login from "./components/pages/Login";

enum WebsiteRoute {
  LOGIN = "/",
  HOME = "/acceuil",
  QUESTIONS_TABLE = "/questionstable",
  QUIZ_PAGE_CATEG = "/quizpage/:categ",
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
                path={WebsiteRoute.QUESTIONS_TABLE}
                element={<QuestionsTable />}
              />
              <Route
                path={WebsiteRoute.QUIZ_PAGE_CATEG}
                element={<QuizPage />}
              />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
