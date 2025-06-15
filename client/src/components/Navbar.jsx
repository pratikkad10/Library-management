import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-zinc-200 dark:bg-custom-dark-1 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-custom-dark-0 dark:text-zinc-100">
            LibraryLoom
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 ">
              About Us
            </Link>
            
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="rounded"
              
            >
              {isDarkMode ? (
                <FaSun className="w-5 h-5 text-gray-700 " />
              ) : (
                <FaMoon className="w-5 h-5 text-zinc-100 " />
              )}
            </Button>

            <div className="flex items-center space-x-4">
              
              <Button variant="text" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
              <Button variant="primary" className='bg-zinc-100 '  onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
