import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getComments } from '../api/api';
import { CommentForm } from '../components/CommentForm';
import { Post, Comment } from '../types';

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchPostAndComments = async () => {
    try {
      if (id) {
        const postData = await getPost(id);
        const commentsData = await getComments(id);
        setPost(postData);
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Failed to fetch post or comments', error);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">
        By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-4">{post.content}</p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="border p-2 mt-2 rounded">
            <p>{comment.content}</p>
            <p className="text-gray-600">
              By {comment.author.username} on {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        <CommentForm postId={id!} onCommentAdded={fetchPostAndComments} />
      </div>
    </div>
  );
};
