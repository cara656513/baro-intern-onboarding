import { Navigate, Outlet, Routes } from "react-router-dom";

import { Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import SignupPage from "../pages/SignupPage";
import { useUserStore } from "../store/useUserStore";

const GuestRoute = () => {
  const user = useUserStore((state) => state.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);
  const isUserLoaded = useUserStore((state) => state.isLoaded);

  if (!isUserLoaded) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 퍼블릭 라우트: 누구나 접근 가능 */}
        <Route path="/" element={<HomePage />} />
        {/* 게스트 라우트: 비로그인 상태에서만 접근 가능 */}
        <Route element={<GuestRoute />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        {/* 프로텍티드 라우트: 로그인 상태에서만 접근 가능 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
