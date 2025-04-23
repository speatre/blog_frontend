export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  email: string;
  created_at: string;
  updated_at: string | null;
}

export interface Comment {
  id: string;
  content: string;
  user_id: User;
  post_id: Post;
  createdAt: string;
  created_at: string;
  updated_at: string | null;
}
