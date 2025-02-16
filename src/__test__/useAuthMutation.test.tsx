import { renderHook } from "@testing-library/react";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { supabase } from "../utils/supabaseClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Mocks
jest.mock("../utils/supabaseClient", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      updateUser: jest.fn(),
    },
  },
}));

// Mock useUserStore
const mockSetUser = jest.fn();
jest.mock("../store/useUserStore", () => ({
  useUserStore: () => ({
    setUser: mockSetUser,
  }),
}));

// // Mock react-router-dom
// jest.mock("react-router-dom", () => ({
//   useNavigate: () => jest.fn(),
// }));

// Test setup
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
);

describe("useAuthMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signUpMutation", () => {
    it("should handle successful signup", async () => {
      const mockUser = { id: 1, email: "test@example.com" };
      (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
        data: { user: mockUser },
        error: null,
      });

      const { result } = renderHook(() => useAuthMutation(), { wrapper });

      await result.current.signUpMutation.mutateAsync({
        email: "test@example.com",
        password: "password123",
        displayName: "Test User",
      });

      expect(window.alert).toHaveBeenCalledWith("회원가입이 완료되었습니다!");
      expect(window.location.href).toBe("/");
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        options: { data: { displayName: "Test User" } },
      });
    });

    it("should handle signup error", async () => {
      const mockError = new Error("Signup failed");
      (supabase.auth.signUp as jest.Mock).mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useAuthMutation(), { wrapper });

      try {
        await result.current.signUpMutation.mutateAsync({
          email: "test@example.com",
          password: "password123",
          displayName: "Test User",
        });
      } catch (error) {
        expect(error).toEqual(mockError);
      }
    });
  });

  describe("signInMutation", () => {
    it("should handle successful login", async () => {
      const mockUser = { id: 1, email: "test@example.com" };
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
        data: { user: mockUser },
        error: null,
      });

      const { result } = renderHook(() => useAuthMutation(), { wrapper });

      await result.current.signInMutation.mutateAsync({
        email: "test@example.com",
        password: "password123",
      });

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockSetUser).toHaveBeenCalled();
    });
  });

  describe("logoutMutation", () => {
    it("should handle successful logout", async () => {
      (supabase.auth.signOut as jest.Mock).mockResolvedValueOnce({
        error: null,
      });

      const { result } = renderHook(() => useAuthMutation(), { wrapper });

      await result.current.logoutMutation.mutateAsync();

      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalled();
    });
  });
});
