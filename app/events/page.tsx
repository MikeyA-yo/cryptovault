"use client";
import client from "@/config/viem";
import abi from "../abis/cryptoloan.json";
import { AbiEvent, getAbiItem, formatEther } from "viem";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EventsPage() {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [logs, setLogs] = useState<any>(null);

  useEffect(() => {
    async function fetchLogs() {
      const logData = await getLogs();
      setLogs(logData);
    }
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Event Logs</h1>
      {logs && (
        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Loans</h2>
            {logs.loanLogs.map((log: { args: { user: string; amount: bigint; dueDate: bigint } }, index:number) => (
              <div key={index} className="mb-4">
                <p>User: {log.args.user}</p>
                <p>Amount: {formatEther(log.args.amount)} ETH</p>
                <p>
                  Due Date:{" "}
                  {new Date(Number(log.args.dueDate) * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Deposits</h2>
            {logs.depositedLogs.map((log: { args: { user: string; amount: bigint; fee: bigint } }, index:number) => (
              <div key={index} className="mb-4">
                <p>User: {log.args.user}</p>
                <p>Amount: {formatEther(log.args.amount)} ETH</p>
                <p>Fee: {formatEther(log.args.fee)} ETH</p>
              </div>
            ))}
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Withdrawals</h2>
            {logs.withdrawnLogs.map((log: { args: { user: string; amount: bigint } }, index:number) => (
              <div key={index} className="mb-4">
                <p>User: {log.args.user}</p>
                <p>Amount: {formatEther(log.args.amount)} ETH</p>
              </div>
            ))}
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Loan Repayments</h2>
            {logs.loanRepaidLogs.map((log: { args: { user: string; amount: bigint } }, index:number) => (
              <div key={index} className="mb-4">
                <p>User: {log.args.user}</p>
                <p>Amount: {formatEther(log.args.amount)} ETH</p>
              </div>
            ))}
          </motion.section>
        </div>
      )}
    </div>
  );
}

async function getLogs() {
  interface Logs {
    loanLogs: typeof loanLogs;
    depositedLogs: typeof depositedLogs;
    withdrawnLogs: typeof withdrawnLogs;
    loanRepaidLogs: typeof loanRepaidLogs;
  }

  const loanLogs = await client.getLogs({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    event: getAbiItem({ abi, name: "LoanTaken" }) as AbiEvent,
    fromBlock: BigInt(8241560),
  });
  console.log(loanLogs);
  const depositedLogs = await client.getLogs({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    event: getAbiItem({ abi, name: "Deposited" }) as AbiEvent,
    fromBlock: BigInt(8241560),
  });
  console.log(depositedLogs);
  const withdrawnLogs = await client.getLogs({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    event: getAbiItem({ abi, name: "Withdrawn" }) as AbiEvent,
    fromBlock: BigInt(8241560),
  });
  console.log(withdrawnLogs);
  const loanRepaidLogs = await client.getLogs({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    event: getAbiItem({ abi, name: "LoanRepaid" }) as AbiEvent,
    fromBlock: BigInt(8241560),
  });
  console.log(loanRepaidLogs);
  const logs: Logs = {
    loanLogs,
    loanRepaidLogs,
    depositedLogs,
    withdrawnLogs,
  };
  return logs;
}
