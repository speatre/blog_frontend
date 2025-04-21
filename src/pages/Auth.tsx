import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '@/services/api';
import { AuthContext } from '@/context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext must be used within AuthProvider');
  const { setUser } = context;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await (isLogin ? login : signup)(email, password);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 underline"
      >
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button>
    </div>
  );
}

export default Auth;
