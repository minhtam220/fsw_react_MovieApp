import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginModal from "../components/LoginModal";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <HomePage />
          </AuthRequire>
        }
      />
      <Route
        path="/home"
        element={
          <AuthRequire>
            <HomePage />
          </AuthRequire>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loginmodal" element={<LoginModal />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
