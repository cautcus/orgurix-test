import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-gray-300 py-12" style={{
      background:
        "linear-gradient(180deg, #1a3c40, #0d1f22)",
    }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Company</h3>
            <ul>
              <li><a href="/company/about" className="hover:text-white">About Us</a></li>
              <li><a href="/company/team" className="hover:text-white">Our Team</a></li>
              <li><a href="/company/careers" className="hover:text-white">Careers</a></li>
              <li><a href="/company/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Support</h3>
            <ul>
              <li><a href="/support/customer" className="hover:text-white">Customer Support</a></li>
              <li><a href="/support/terms" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="/support/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/support/help" className="hover:text-white">Help Center</a></li>
            </ul>
          </div>
          <div>
            {/* <h3 className="text-xl font-semibold mb-4 text-white">Products</h3>
            <ul>
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><a href="/features" className="hover:text-white">Features</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul> */}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com/orgurix" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaFacebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/orgurix" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaTwitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/orgurix" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/orgurix" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} orgurix.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
