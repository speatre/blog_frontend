import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">Blog</a>
        <div>
          {user ? (
            <>
              <a href="/dashboard" className="mr-4">Dashboard</a>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="mr-4">Login</a>
              <a href="/signup" className="bg-blue-500 px-4 py-2 rounded">Signup</a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
