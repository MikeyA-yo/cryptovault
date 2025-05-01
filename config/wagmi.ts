import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { createConfig, injected } from "wagmi";

const config = createConfig({
    chains: [sepolia],
    connectors: [injected()], 
    transports: {
      [sepolia.id]: http('https://sepolia.example.com'),
    },
})

export default config