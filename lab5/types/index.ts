export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}
