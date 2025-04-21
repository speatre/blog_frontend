import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

function Navbar() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext must be used within AuthProvider');
  const { user, logout } = context;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center mb-8">
      <Link to="/api/" className="text-2xl font-bold">
        Blog App
      </Link>
      <div className="space-x-4">
        <Link to="/api/" className="hover:underline">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/create" className="hover:underline">
              Create Post
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="hover:underline">
            Login/Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
