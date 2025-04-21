import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AuthResponse, Post, User } from '@/types';

// Base API URL
const API_URL = process.env.API_URL || 'http://localhost:3000';

// Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================
// Auth APIs
// ==========================
export const signup = (email: string, password: string) =>
  api.post<AuthResponse>('/users/signup', { email, password });

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/users/login', { email, password });

export const getCurrentUser = () => api.get<User>('/users/me');

export const logout = () => {
  localStorage.removeItem('token');
  return Promise.resolve();
};

// ==========================
// Post APIs
// ==========================
export const getPosts = () => api.get<Post[]>('/posts');

export const getPost = (id: string) => api.get<Post>(`/posts/${id}`);

export const createPost = (post: Pick<Post, 'title' | 'content'>) =>
  api.post<Post>('/posts', post);

export const updatePost = (id: string, post: Pick<Post, 'title' | 'content'>) =>
  api.put<Post>(`/posts/${id}`, post);

export const deletePost = (id: string) => api.delete<void>(`/posts/${id}`);
