import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="border p-4 rounded shadow">
      <Link to={`/post/${post.id}`}>
        <h3 className="text-xl font-bold">{post.title}</h3>
      </Link>
      <p>{post.content.substring(0, 100)}...</p>
      <p className="text-gray-600">By {post.email} on {new Date(post.created_at).toLocaleDateString()}</p>
    </div>
  );
};
