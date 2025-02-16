import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useUserStore } from "../store/useUserStore";
import { UserData } from "../types/user";

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, displayName }: UserData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { displayName },
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      window.location.href = "/";
    },
    onError: (error: Error) => {
      console.error("회원가입 오류:", error);
      alert(error.message || "회원가입 중 오류가 발생했습니다.");
    },
  });

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: Omit<UserData, "displayName">) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await setUser();
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("로그인 오류:", error);
      alert(error.message);
    },
  });

  const userUpdateMutation = useMutation({
    mutationFn: async (newDisplayName: string) => {
      if (!newDisplayName.trim()) {
        throw new Error("닉네임을 입력해주세요.");
      }

      const { data, error } = await supabase.auth.updateUser({
        data: { displayName: newDisplayName.trim() },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await setUser();
      alert("닉네임이 변경되었습니다!");
    },
    onError: (error: Error) => {
      console.error("닉네임 변경 오류:", error);
      alert(error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: async () => {
      await setUser();
      alert("로그아웃 되었습니다!");
    },
    onError: (error: Error) => {
      console.error("로그아웃 오류:", error);
      alert(error.message);
    },
  });

  return { signUpMutation, signInMutation, userUpdateMutation, logoutMutation };
};
