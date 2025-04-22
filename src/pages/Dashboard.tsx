import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, createPost, updatePost, deletePost } from '../api/api';
import { PostForm } from '../components/PostForm';
import { AuthContext } from '../context/AuthContext';
import { Post } from '../types';

export const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.filter((post: Post) => post.author._id === user._id));
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    fetchPosts();
  }, [user, navigate]);

  const handleCreate = async (post: { title: string; content: string }) => {
    try {
      await createPost(post);
      const data = await getPosts();
      setPosts(data.filter((post: Post) => post.author._id === user!._id));
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  const handleUpdate = async (post: { title: string; content: string }) => {
    if (!editingPost) return;
    try {
      await updatePost(editingPost._id, post);
      setEditingPost(null);
      const data = await getPosts();
      setPosts(data.filter((post: Post) => post.author._id === user!._id));
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-2xl font-bold mb-2">{editingPost ? 'Edit Post' : 'Create Post'}</h2>
      <PostForm post={editingPost} onSubmit={editingPost ? handleUpdate : handleCreate} />
      <h2 className="text-2xl font-bold mt-8 mb-2">Your Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingPost(post)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
