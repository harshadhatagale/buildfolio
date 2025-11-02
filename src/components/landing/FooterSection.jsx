import React from "react";
import { Github, Twitter, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0B0B] text-gray-700 dark:text-gray-300 mt-10">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              BuildFolio
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              The easiest way to build, design and share your professional portfolio.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-blue-500">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-500">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-blue-500">Documentation</Link></li>
              <li><Link href="/blog" className="hover:text-blue-500">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
              <li><Link href="/careers" className="hover:text-blue-500">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500">Terms</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-3">
              Connect
            </h3>
            <div className="flex space-x-4 mt-2">
              <Link href="https://github.com" target="_blank" className="hover:text-blue-500">
                <Github size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-blue-500">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-500">
                <Linkedin size={20} />
              </Link>
              <Link href="/" className="hover:text-blue-500">
                <Globe size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} BuildFolio. All rights reserved.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 md:mt-0">
            Crafted with ❤️ by <span className="font-semibold text-blue-500">Harshad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
