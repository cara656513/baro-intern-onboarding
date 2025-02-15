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
            nickname: userData.nickname,
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
        console.log(error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { signInMutation, signUpMutation };
};
