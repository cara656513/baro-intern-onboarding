import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { Session } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  session: null,
  setSession: (session) => set({ session }),
}));
