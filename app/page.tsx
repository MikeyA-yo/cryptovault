"use client"
import { motion } from 'framer-motion';
import { useConnect } from 'wagmi';


export default function Home() {
  const {connect, connectors} = useConnect()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-[family-name:var(--font-geist-sans)]">
      <nav className="p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">CryptoLoan</h1>
          </motion.div>
          <div className="flex gap-2">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                }}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <img
                  src={`${connector.icon ? connector.icon : 'icons/'+connector.name+'.svg'}`}
                  alt={connector.name}
                  className="w-6 h-6 bg-orange-500 rounded-full hover:rounded-none"
                />
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <section className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Your Web3 Vault</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Securely store your Sepolia ETH and borrow up to 150% of your deposit after one week. Flexible repayment terms tailored to your needs.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Store ETH</h3>
              <p className="text-gray-400">
                Deposit your Sepolia ETH into our secure vault and earn interest over time.
              </p>
            </div>
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Borrow ETH</h3>
              <p className="text-gray-400">
                After one week, borrow up to 150% of your deposited amount with flexible repayment terms.
              </p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
