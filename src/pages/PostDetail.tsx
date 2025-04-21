import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost, deletePost } from '@/services/api';
import { AuthContext } from '@/context/AuthContext';
import { Post } from '@/types';

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext must be used within AuthProvider');
  const { user } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPost(id)
        .then((res) => {
          setPost(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(() => setError('Failed to fetch post'));
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updatePost(id, { title, content });
      setPost({ ...post!, title, content });
      setIsEditing(false);
    } catch (err: any) {
      setError('Failed to update post');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (err: any) {
        setError('Failed to delete post');
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="mb-4">{post.content}</p>
          <p className="text-gray-500 text-sm">
            By {post.author?.email || 'Unknown'} on{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          {user?._id === post.author?._id && (
            <div className="mt-4 space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default PostDetail;
