import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import supabase from "../utils/supabaseClient";

interface UserStore {
  user: User | null;
  isLogin: boolean;
  setUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLogin: false,
  setUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("사용자 정보 로딩 실패:", error);
    } else {
      set({ user: data.user, isLogin: true });
    }
  },
}));
