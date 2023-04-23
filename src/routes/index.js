import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LoginModal from "../components/LoginModal";
import TvPage from "../pages/TvPage";
import MoviePage from "../pages/MoviePage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginmodal" element={<LoginModal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="tv" element={<TvPage />} />
        <Route path="movie" element={<MoviePage />} />
        <Route path="movies/:id" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
