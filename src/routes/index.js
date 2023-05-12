import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";

//pages
import BrowsePage from "../pages/BrowsePage";
import LoginPage from "../pages/LoginPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import DiscoverPage from "../pages/DiscoverPage";
import WatchLaterPage from "../pages/WatchLaterPage";
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
      <Route
        path="/watchlater"
        element={
          <AuthRequire>
            <WatchLaterPage />
          </AuthRequire>
        }
      />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
