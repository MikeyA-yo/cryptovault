'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed  bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 cursor-pointer rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg transition-all duration-200"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className="absolute bottom-14 left-0 bg-gray-800 rounded-lg shadow-lg p-2 space-y-2">
            <Link href="/" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-md">Home</Link>
            <Link href="/loan" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-md">Loan</Link>
            <Link href="/account" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-md">Account</Link>
            <Link href="/store" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-md">Store</Link>
          </div>
        )}
      </div>


    </>
  );
};

export default Navigation;