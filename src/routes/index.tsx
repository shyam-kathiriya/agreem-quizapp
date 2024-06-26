import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Quiz from "../pages/Quiz";
import QuizResult from "../pages/QuizResult";

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/quiz'} />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quiz-result" element={<QuizResult />} />
    </Routes>
  );
};

export default MainRoutes;
