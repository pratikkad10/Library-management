import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="flex flex-1">
        <Sidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
