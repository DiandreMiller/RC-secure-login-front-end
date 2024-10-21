//Create routes for the footer links

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">© 2024 Diandre Miller</p>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="/" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="/" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  