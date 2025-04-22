import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createComment } from '../api/api';

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }
    try {
      await createComment(postId, content);
      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Add a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};
