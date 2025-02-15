import { useState } from "react";
import { useAuthMutation } from "../hooks/useAuthMutation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const { signUpMutation } = useAuthMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const response = await register(formData);

    //   if (response.ok) {
    //     alert("회원가입이 완료되었습니다!");
    //     navigate("/login");
    //   } else {
    //     const errorData = await response.json();
    //     alert(errorData.message || "회원가입에 실패했습니다.");
    //   }
    // } catch (error) {
    //   console.error("회원가입 에러:", error);
    //   alert("회원가입 중 오류가 발생했습니다.");
    signUpMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">회원가입</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                아이디
              </label>
              <input
                id="id"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
