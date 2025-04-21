import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '@/services/api';
import { Post } from '@/types';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch(() => setError('Failed to fetch posts'));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow">
            <Link to={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p>{post.content.slice(0, 100)}...</p>
            <p className="text-gray-500 text-sm">
              By {post.author?.email || 'Unknown'} on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
