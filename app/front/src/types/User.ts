export interface User {
  id: number;
  email: string;
  username: string;
  profilePicture: string;
  isPublic: true;
  description: string;
  phone: string;
  age: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}


export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
