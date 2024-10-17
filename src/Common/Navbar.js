import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
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
    </nav>
  );
}

export default Navbar;
