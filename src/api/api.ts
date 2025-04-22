import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/signup', { email, password });
  return response.data;
};

export const logout = async () => {
  await apiClient.post('/auth/logout');
};

export const getPosts = async () => {
  const response = await apiClient.get('/posts');
  return response.data;
};

export const getPost = async (id: string) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: { title: string; content: string }) => {
  const response = await apiClient.post('/posts', post);
  return response.data;
};

export const updatePost = async (id: string, post: { title: string; content: string }) => {
  const response = await apiClient.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string) => {
  await apiClient.delete(`/posts/${id}`);
};

export const createComment = async (postId: string, content: string) => {
  const response = await apiClient.post(`/posts/${postId}/comments`, { content });
  return response.data;
};

export const getComments = async (postId: string) => {
  const response = await apiClient.get(`/posts/${postId}/comments`);
  return response.data;
};
