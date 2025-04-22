import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">
        By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2">{post.content.substring(0, 100)}...</p>
      <a href={`/post/${post._id}`} className="text-blue-500">Read More</a>
    </div>
  );
};
