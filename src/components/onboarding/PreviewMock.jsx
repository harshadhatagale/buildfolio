"use client";

import { motion } from "framer-motion";

export default function PreviewMock({ children, title = "Portfolio Preview" }) {
  return (
    <section className="w-full flex flex-col items-center justify-center py-8 px-4">
      {/* Premium Mockup Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto"
      >
        {/* Browser Mockup */}
        <div className="relative rounded-2xl lg:rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden group">
          {/* Browser Header */}
          <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500"></div>
            </div>
            
            {/* URL Bar */}
            <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                  <div className="w-4 h-4 text-gray-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    https://portfolio.example.com
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>

          {/* Mockup Content Area */}
          <div className="relative">
            {/* Remove the gradient overlay that was causing extra space */}
            
            {/* Scrollable Content */}
            <div className="relative h-[500px] lg:h-[600px] overflow-y-auto">
              {/* Content Container - REMOVED PADDING to eliminate extra space */}
              <div className="min-h-full">
                {children}
              </div>
            </div>
          </div>
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 dark:border-gray-700 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 dark:border-gray-700 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 dark:border-gray-700 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 dark:border-gray-700 rounded-br-lg" />
        </div>

        {/* Mockup Footer Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live Preview</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
            Responsive
          </span>
        </div>
      </motion.div>
    </section>
  );
}