"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useWriteContract } from "wagmi";
import abi from "../abis/cryptoloan.json";
import { parseEther } from "viem";
import { useRouter } from "next/navigation";

const LoanPage = () => {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    writeContract(
      {
        abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "takeLoan",
        account: address,
        value: parseEther(amount),
        args: [parseEther(amount), parseInt(period)],
      },
      {
        onSuccess: () => {
          console.log("ETH loaned successfully");
          setToast({ type: "success", message: "ETH loaned successfully" });
        },
        onError: (error) => {
          console.error("ETH loan failed", error);
          setToast({
            type: "error",
            message:
              "ETH loan failed, if this persists, the smart contract does not have enough sepolia eth to loan",
          });
        },
      }
    );
  };
  useEffect(() => {
    if (!address) {
      setToast({ type: "error", message: "Please connect your wallet" });

      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  }, []);

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
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300"
            >
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
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-300"
            >
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
            className="w-full cursor-pointer px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            Borrow ETH
          </button>
        </form>
      </motion.div>
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 p-4 rounded-md text-white"
            style={{
              backgroundColor: toast.type === "success" ? "#4CAF50" : "#F44336",
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoanPage;
