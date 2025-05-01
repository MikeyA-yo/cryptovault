"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const LoanPage = () => {
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-8">Borrow ETH</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
              Amount (ETH)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-300">
              Period (days)
            </label>
            <input
              type="number"
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter period"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            Borrow ETH
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoanPage;