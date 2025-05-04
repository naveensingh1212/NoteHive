import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [quote, setQuote] = useState("");

  // List of inspirational quotes
  const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
    "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
    "Dream big and dare to fail. – Norman Vaughan",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis"
  ];

  // Pick a random quote on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <motion.h1
          className="text-4xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Organize Your Thoughts with NoteHive
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A simple and elegant note-taking app to keep your ideas in sync.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/signup"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Quote Section */}
      <section className="py-12 px-4 bg-gray-50 text-center">
        <motion.div
          className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-500">Quote of the Day</h3>
          <p className="text-xl italic text-gray-600">“{quote}”</p>
        </motion.div>
      </section>
    </div>
  );
}
