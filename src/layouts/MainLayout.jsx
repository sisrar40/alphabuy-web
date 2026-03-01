import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-black">
                  A
                </div>
                <span className="text-xl font-black">Alphabuy</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Asia's premier water park destination. Creating unforgettable
                aquatic adventures since 2010 across multiple locations.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  "About Us",
                  "Our Parks",
                  "Rides & Attractions",
                  "Gallery",
                  "Contact",
                  "Blog",
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all flex items-center gap-2 group"
                    >
                      <FaArrowRight className="text-xs text-blue-500 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg  text-white mb-6">Support</h4>
              <ul className="space-y-4">
                {[
                  "FAQs",
                  "Terms & Conditions",
                  "Privacy Policy",
                  "Refund Policy",
                  "Careers",
                  "Safety Guidelines",
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg text-white mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <FaPhone className="text-blue-500" /> +91 12345 67890
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaEnvelope className="text-blue-500" /> info@Alphabuy.com
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaMapMarkerAlt className="text-blue-500" /> Dubai, UAE
                </li>
              </ul>

              {/* Newsletter */}
              <div className="mt-8">
                <h5 className="font-bold text-gray-400 mb-3">
                  Subscribe to Updates
                </h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 bg-gray-800 rounded-l-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-3 bg-blue-600 rounded-r-xl hover:bg-blue-700 transition-all">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              © 2024 Alphabuy. All rights reserved. Making waves across Asia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
