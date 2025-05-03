"use client";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useEnsName, useEnsAvatar, useReadContract, useWriteContract } from "wagmi";
import { AnimatePresence, motion } from "framer-motion";
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
  const { data: loanData } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    account: address,
    functionName:"loans",
    args: [address]
  })
  const { data: isOverdue } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    account: address,
    functionName:"isLoanOverdue"
  })
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const { writeContract } = useWriteContract();

  const handleWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    writeContract(
      {
        abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'withdraw',
        account: address,
        args: [parseEther(withdrawAmount)],
      },
      {
        onSuccess: () => {
          setToast({ type: 'success', message: 'Withdraw successful' });
        },
        onError: (error) => {
          console.error('Withdraw failed', error);
          setToast({ type: 'error', message: 'Withdraw failed' });
        },
      }
    );
  };

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
        <div className="mt-6 space-y-4">
        {typeof loanData === 'bigint' && loanData > BigInt(0) && (
            <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-gray-200 text-sm">Your Loan</p>
            <p className="text-white font-bold text-xl">{formatEther(BigInt(Math.floor(Number(loanData))))} ETH</p>
            <button
              onClick={() => {
                const interestRate = isOverdue ? 1.5 : 1.1;
                const repaymentAmount = Number(loanData.toString()) * interestRate;
                writeContract({
                  abi,
                  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                  functionName: 'repayLoan',
                  account: address,
                  value: parseEther(repaymentAmount.toString())
                }, {
                  onSuccess: () => {
                    setToast({ type: 'success', message: 'Loan repaid successfully' });
                  },
                  onError: (error) => {
                    console.error('Loan repayment failed', error);
                    setToast({ type: 'error', message: 'Loan repayment failed' });
                  }
                });
              }}
              className="w-full mt-2 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Repay Loan ({isOverdue ? '50%' : '10%'} interest)
            </button>
          </div>
          )}
        </div>
        <form onSubmit={handleWithdraw} className="mt-6 space-y-4">
          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-gray-200 text-sm">Withdraw Amount (ETH)</p>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter amount"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Withdraw
          </button>
        </form>
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 p-4 rounded-md text-white"
              style={{ backgroundColor: toast.type === 'success' ? '#4CAF50' : '#F44336' }}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Account;
