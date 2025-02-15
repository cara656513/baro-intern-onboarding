import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import supabase from "../utils/supabaseClient";

interface UserStore {
  user: User | null;
  isLogin: boolean;
  isLoaded: boolean;
  setUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLogin: false,
  isLoaded: false,
  setUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;

      set({
        user: data.user,
        isLogin: !!data.user,
        isLoaded: true,
      });
    } catch (error) {
      console.error("사용자 정보 로딩 실패:", error);
      set({ user: null, isLogin: false, isLoaded: true });
    }
  },
}));
