import { useState, useEffect } from "react";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { useUserStore } from "../store/useUserStore";

export default function MyPage() {
  const { user } = useUserStore();
  const [newDisplayName, setNewDisplayName] = useState("");
  const { userUpdateMutation } = useAuthMutation();

  useEffect(() => {
    if (user?.user_metadata?.displayName) {
      setNewDisplayName(user.user_metadata.displayName);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userUpdateMutation.mutate(newDisplayName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">마이 페이지</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </label>
              <input
                id="displayName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newDisplayName}
                onChange={handleChange}
                placeholder="새로운 닉네임을 입력하세요"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            disabled={userUpdateMutation.isPending}
          >
            {userUpdateMutation.isPending ? "변경 중..." : "닉네임 변경"}
          </button>
        </form>
      </div>
    </div>
  );
}
