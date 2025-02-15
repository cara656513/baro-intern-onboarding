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
        email: userData.id,
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
        email: userData.id,
        password: userData.password,
      });

      if (error) {
        throw new Error("아이디 또는 비밀번호를 확인 해주세요.");
      }

      return data;
    },
    onSuccess: (data) => {
      //성공하면 data.user를 업데이트 하고 홈 화면으로 이동
      setUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      console.error(error.message); //실패하면 에러메세지 출력
    },
  });

  return { signInMutation, signUpMutation };
};
