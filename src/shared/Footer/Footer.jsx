// 📁 src/components/Shared/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/mealBridge-logo.png';

const Footer = () => {
  const activeClass = "text-primary font-bold"; // Active page style

  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">
            <img className="w-22" src={logo} alt="MealBridge Logo" />
          </h2>
          <p className="text-sm text-gray-600">
            A community-driven platform to reduce food waste and fight hunger by connecting restaurants and charities.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl hover:text-primary" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-primary" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-primary" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-primary" />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-secondary mt-2 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>🏠 <NavLink to="/" className={({ isActive }) => isActive ? activeClass : ""}>Home</NavLink></li>
            <li>🍱 <NavLink to="/allDonations" className={({ isActive }) => isActive ? activeClass : ""}>All Donations</NavLink></li>
            <li>📊 <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : ""}>Dashboard</NavLink></li>
            <li>🔐 <NavLink to="/login" className={({ isActive }) => isActive ? activeClass : ""}>Login</NavLink></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-secondary mt-2 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>📖 <NavLink to="/about-us" className={({ isActive }) => isActive ? activeClass : ""}>About Us</NavLink></li>
            <li>📞 <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : ""}>Contact</NavLink></li>
            <li>❓ <NavLink to="/faqs" className={({ isActive }) => isActive ? activeClass : ""}>FAQs</NavLink></li>
            <li>🔒 <NavLink to="/privacy-policy" className={({ isActive }) => isActive ? activeClass : ""}>Privacy Policy</NavLink></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold text-secondary mt-2 mb-3">Contact Info</h3>
          <p className="text-sm text-gray-600 mb-1">📍 Sylhet, Bangladesh</p>
          <p className="text-sm text-gray-600 mb-1">📧 support@mealbridge.com</p>
          <p className="text-sm text-gray-600">📞 +880-1234-567890</p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-300 text-sm text-gray-500">
        © {new Date().getFullYear()} MealBridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
