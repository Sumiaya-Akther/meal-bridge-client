import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';
import logo from '../../assets/mealBridge-logo.png'

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4"><img className='w-22' src={logo} alt="" /></h2>
          <p className="text-sm text-gray-600">
            A community-driven platform to reduce food waste and fight hunger by connecting restaurants and charities.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-xl hover:text-primary" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-xl hover:text-primary" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-xl hover:text-primary" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-xl hover:text-primary" /></a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-secondary mt-2 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>🏠 Home</li>
            <li>🍱 All Donations</li>
            <li>📊 Dashboard</li>
            <li>🔐 Login</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-secondary mt-2 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>📖 About Us</li>
            <li>📞 Contact</li>
            <li>❓ FAQs</li>
            <li>🔒 Privacy Policy</li>
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
