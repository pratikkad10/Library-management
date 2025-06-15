import { Link } from 'react-router-dom'
import { FaHome, FaUser, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'


const Sidebar = ({ toggleTheme, isDarkMode }) => {

  return (
    <div className="w-42 bg-zinc-200 dark:bg-custom-dark-1 min-h-screen shadow-lg">
      <div className="p-4">
        {/* <div className="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-12 w-12" />
          <h1 className="text-xl font-bold ml-2">Library</h1>
        </div> */}

        <nav className="space-y-2">
          <Link to="/" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <FaHome className="w-5 h-5" />
            <span className="ml-3">Home</span>
          </Link>

          <Link to="/dashboard" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <MdDashboard className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </Link>

          <Link to="/profile" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <FaUser className="w-5 h-5" />
            <span className="ml-3">Profile</span>
          </Link>

          <button 
            onClick={toggleTheme}
            className="w-full flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {isDarkMode  ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            <span className="ml-3">Theme</span>
          </button>

          <button className="w-full flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <FaSignOutAlt className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
