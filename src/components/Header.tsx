import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useAuthMutation } from "../hooks/useAuthMutation";
export default function Header() {
  const { isLogin, isLoaded } = useUserStore();
  const { logoutMutation } = useAuthMutation();
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <header className="sticky top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            홈
          </Link>
          <nav className="flex gap-4">
            {!isLogin ? (
              <>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  회원가입
                </Link>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  로그인
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/mypage"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => logoutMutation.mutate()}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md cursor-pointer"
                >
                  로그아웃
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
