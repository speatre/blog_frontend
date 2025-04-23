import { useEffect, useState } from 'react';
import { getPosts } from '../api/api';
import { PostCard } from '../components/PostCard';
import { Post } from '../types';

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        console.log('Fetched posts:', data); // Debug log
        setPosts(data.posts || []); // Fallback to empty array if data is falsy
        setLoading(false);
      } catch (error: any) {
        console.error('Failed to fetch posts:', error);
        setError(error.message || 'Failed to load posts. Please try again later.');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts available. Create one in the dashboard!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
