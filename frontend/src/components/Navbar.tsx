import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaRocket, FaGraduationCap } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface MenuItem {
  name: string;
  href: string;
  icon?: JSX.Element;
}

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { isLoggedIn } = useAuth();

  const menuItems: MenuItem[] = [
    { name: "Home", href: "/" },
    { name: "Mars Talk", href: "/learn-about-mars" },
    { name: "Nasa Knowledge", href: "/nasa-knowledge"},
    { name: "Explore Mission", href: "/start-mission", icon: <FaRocket /> },
    // Removed Community link
    // Profile link is now conditionally rendered outside the map
  ];

  const profileMenuItem: MenuItem = { name: "Profile", href: "/profile", icon: <FaGraduationCap /> };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="navbar-logo flex-shrink-0 text-2xl font-bold tracking-wide hover:text-red-400 transition-colors duration-300">
            Mars Dashboard
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => {
              let className = "flex items-center gap-1 hover:text-red-400 transition-colors duration-300";
              if (item.name === "Home") className += " navbar-home";
              if (item.name === "Mars Talk") className += " navbar-mars-talk";
              if (item.name === "Nasa Knowledge") className += " navbar-nasa";
              if (item.name === "Explore Mission") className += " navbar-mission";
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={className}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.name}
                </a>
              );
            })}
            {isLoggedIn ? (
              <a
                href={profileMenuItem.href}
                className="flex items-center gap-1 hover:text-red-400 transition-colors duration-300"
              >
                {profileMenuItem.icon && <span>{profileMenuItem.icon}</span>}
                {profileMenuItem.name}
              </a>
            ) : (
              <a
                href="/signin"
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-500 transition-colors duration-300"
              >
                Sign In / Sign Up
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-90">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col items-start">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 w-full px-3 py-2 rounded-md hover:bg-red-800 transition-colors duration-300"
              >
                {item.icon && <span>{item.icon}</span>}
                {item.name}
              </a>
            ))}
            {isLoggedIn ? (
              <a
                href={profileMenuItem.href}
                className="flex items-center gap-1 w-full px-3 py-2 rounded-md hover:bg-red-800 transition-colors duration-300"
              >
                {profileMenuItem.icon && <span>{profileMenuItem.icon}</span>}
                {profileMenuItem.name}
              </a>
            ) : (
              <a
                href="/signin"
                className="w-full text-center bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-500 transition-colors duration-300"
              >
                Sign In / Sign Up
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
