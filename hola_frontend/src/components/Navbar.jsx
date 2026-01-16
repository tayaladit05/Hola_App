import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaInstagram, FaHome, FaPlusSquare, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ onCreatePost }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaInstagram className="text-3xl" />
            <span className="text-2xl font-semibold" style={{ fontFamily: 'cursive' }}>
              Hola
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-600">
              <FaHome className="text-2xl" />
            </Link>
            
            <button onClick={onCreatePost} className="hover:text-gray-600">
              <FaPlusSquare className="text-2xl" />
            </button>

            <Link to="/profile" className="hover:text-gray-600">
              <FaUser className="text-2xl" />
            </Link>

            <button
              onClick={handleLogout}
              className="hover:text-gray-600"
              title="Logout"
            >
              <FaSignOutAlt className="text-2xl" />
            </button>

            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">{user.username}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
