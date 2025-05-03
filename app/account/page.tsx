"use client";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useEnsName, useEnsAvatar, useReadContract } from "wagmi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import abi from "../abis/cryptoloan.json";
import { formatEther, parseEther } from "viem";

const Account = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const router = useRouter();
  const data = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    account: address,
    functionName:"getHighestBalance"
  })
  const increasedValue = data.data ? Number(data.data) * 2.5 : 0;
  const { data: balance } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    account: address,
    functionName:"getUserBalance"
  })
  console.log(balance);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-2xl"
      >
        <div className="flex items-center gap-4 p-6 bg-white/20 backdrop-blur-sm rounded-lg">
          {isClient && ensAvatar && (
            <img
              src={ensAvatar}
              alt="ENS Avatar"
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            {isClient && ensName && (
              <h2 className="text-2xl font-bold text-white">{ensName}</h2>
            )}
            <p className="text-gray-200 break-all text-sm">{isClient ? address : ''}</p>
          </div>
        </div>
        <button
          onClick={() => {disconnect(void 0, {onSuccess: ()=> {router.push('/')}});  }}
          className="mt-6 px-6 cursor-pointer py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Disconnect
        </button>
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-gray-200 text-sm">Possible Loan Value</p>
            <p className="text-white font-bold text-xl">{formatEther(BigInt(Math.floor(increasedValue)))} ETH</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-gray-200 text-sm">Your Balance</p>
            <p className="text-white font-bold text-xl">{balance ? formatEther(BigInt(Math.floor(Number(balance)))) : '0'} ETH</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Account;
