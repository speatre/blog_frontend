import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getComments } from '../api/api';
import { CommentForm } from '../components/CommentForm';
import { Post, Comment } from '../types';

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPost(id!);
        setPost(postData.posts);
        const commentData = await getComments(id!);
        setComments(commentData);
        setLoading(false);
      } catch (error: any) {
        console.error('Failed to fetch post or comments:', error);
        setError(error.message || 'Failed to load post. Please try again later.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentAdded = async () => {
    try {
      const commentData = await getComments(id!);
      setComments(commentData);
    } catch (error) {
      console.error('Failed to refresh comments:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading post...</div>;
  }

  if (error || !post) {
    return <div className="container mx-auto p-4 text-red-500 text-center">{error || 'Post not found.'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.email} on {new Date(post.created_at).toLocaleDateString()}
      </p>
      <p>{post.content}</p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <CommentForm postId={id!} onCommentAdded={handleCommentAdded} />
      <div className="space-y-4 mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border p-4 rounded">
              <p>{comment.content}</p>
              <p className="text-gray-600">
                By {comment.author.username} on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
