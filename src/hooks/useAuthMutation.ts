import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useUserStore } from "../store/useUserStore";
import { UserData } from "../types/user";

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const signUpMutation = useMutation({
    mutationFn: async (userData: UserData) => {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            displayName: userData.displayName,
          },
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    },
    onError: (error: Error) => {
      alert(error.message || "회원가입 중 오류가 발생했습니다.");
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (userData: UserData) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      setUser();
      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const userUpdateMutation = useMutation({
    mutationFn: async (newDisplayName: string) => {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          displayName: newDisplayName,
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      alert("닉네임이 변경되었습니다!");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { signInMutation, signUpMutation, userUpdateMutation };
};
