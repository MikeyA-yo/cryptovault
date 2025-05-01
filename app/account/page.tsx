"use client";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import { motion } from "framer-motion";

const Account = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

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
          onClick={() => disconnect()}
          className="mt-6 px-6 cursor-pointer py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Disconnect
        </button>
      </motion.div>
    </div>
  );
};

export default Account;
