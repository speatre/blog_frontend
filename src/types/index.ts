export interface User {
    _id: string;
    email: string;
}
  
export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User | null;
  createdAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
