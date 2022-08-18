import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SearchUsersPage } from "./Pages/SearchUsersPage";
import { UserPage } from "./Pages/UserPage";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchUsersPage />} />
        <Route path="user/:login" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
