import { Routes } from "react-router-dom";

import { Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import SignupPage from "../pages/SignupPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
