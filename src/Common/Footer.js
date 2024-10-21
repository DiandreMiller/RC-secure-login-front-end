//Create routes for the footer links

import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">© 2024 Diandre Miller</p>
          <div className="flex space-x-4">
             <Link>className="text-gray-400 hover:text-white">Privacy Policy</Link>
             <Link>className="text-gray-400 hover:text-white">Terms of Service</Link>
             <Link>className="text-gray-400 hover:text-white">Contact Us</Link>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  