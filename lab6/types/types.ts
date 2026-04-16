import type { User } from "firebase/auth";

export interface UserProfile {
  name: string;
  age: number;
  city: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}
