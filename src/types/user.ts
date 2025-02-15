export interface UserData {
  id: string;
  password: string;
  nickname: string;
}

export interface UserResponse {
  id: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface ProfileUpdateRequest {
  nickname?: string;
  password?: string;
}
