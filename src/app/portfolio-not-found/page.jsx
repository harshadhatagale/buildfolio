// app/not-found/page.jsx  (or pages/404.jsx if using Pages Router)
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Frown, ArrowLeft } from "lucide-react";

export default function NotFoundPortfolio() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-secondary  px-6">
      {/* Icon Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="bg-secondary flex justify-center items-center p-6 rounded-full border border-gray-700 shadow-lg"
      >
        <Frown size={50} className="text-foreground" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-4xl font-bold"
      >
        Portfolio Not Found
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-gray-400 text-center max-w-md"
      >
        Looks like this portfolio doesn’t exist or has been removed.
        Double-check the link or explore other amazing portfolios.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
