import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="text-center px-4 sm:px-6 -mt-16 sm:-mt-24 max-w-2xl">
        {/* Playful SVG Illustration (Simple Rocket for "lost in space" vibe) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <svg
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto text-blue-500 dark:text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.div>
        {/* Animated 404 Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 tracking-tight"
          aria-label="404 Error"
        >
          404
        </motion.h1>
        {/* Sliding Badge */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-4"
        >
          <span className="inline-block bg-purple-600 dark:bg-purple-500 px-6 py-2 text-sm font-semibold text-white rounded-full shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            Page Lost in Space!
          </span>
        </motion.div>
        {/* Playful Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed"
        >
          Houston, we have a problem! This page seems to have drifted into a
          black hole. Let’s navigate back to safety.
        </motion.p>
        {/* Interactive Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-block px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300"
            aria-label="Navigate back to homepage"
          >
            Beam Me Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
