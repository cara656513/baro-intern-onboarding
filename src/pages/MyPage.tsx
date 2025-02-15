import { useState } from "react";
import { useAuthMutation } from "../hooks/useAuthMutation";

export default function MyPage() {
  const [newDisplayName, setNewDisplayName] = useState("");
  const { userUpdateMutation } = useAuthMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userUpdateMutation.mutate(newDisplayName);
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">마이 페이지</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                닉네임
              </label>
              <input
                id="newDisplayName"
                type="newDisplayName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
}
