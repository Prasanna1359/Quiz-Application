import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./QuizTask/Layout";
import Register from "./QuizTask/Register";
import Login from "./QuizTask/Login";
import AdminDashboard from "./QuizTask/AdminDashboard";
import UserDashboard from "./QuizTask/UserDashboard";
import NoPage from "./QuizTask/NoPage";
import Reslts from "./QuizTask/Reslts";
import ResultTable from "./QuizTask/ResultTable";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ONLY this page has Layout */}
        <Route path="/" element={<Layout />} />

        {/* Pages WITHOUT Layout */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/Results" element={<Reslts />} />
        <Route path="/ResultTable" element={<ResultTable />} />

        {/* 404 */}
        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
