import { Link } from 'react-router-dom';
import { useAuth } from '../authenthication/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="text-white hover:text-gray-300"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
