import { configureChains } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import type { Chain } from 'wagmi';
import { createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const lineaSepolia = {
  id: 59_141,
  name: 'Linea Sepolia Testnet',
  network: 'linea-sepolia',
  nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.linea.build'],
      webSocket: ['wss://rpc.sepolia.linea.build'],
    },
    public: {
      http: ['https://rpc.sepolia.linea.build'],
      webSocket: ['wss://rpc.sepolia.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.lineascan.build',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 227427,
    },
  },
  testnet: true,
} as Chain;

const { chains, publicClient } = configureChains(
  [lineaSepolia, mainnet],
  [publicProvider()],
);

const walletConnectProjectId = 'f9f08df5485d8e71127deb33ee1be4f7';

export const WAGMI_CONFIG = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
        showQrModal: false,
      },
    }),
  ],
  publicClient,
});
