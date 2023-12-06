import type { Address } from 'viem';

const lineaMainnet = {
  id: 59_144,
  name: 'Linea Mainnet',
  network: 'linea-mainnet',
  nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    infura: {
      http: ['https://linea-mainnet.infura.io/v3'],
      webSocket: ['wss://linea-mainnet.infura.io/ws/v3'],
    },
    default: {
      http: ['https://rpc.linea.build'],
      webSocket: ['wss://rpc.linea.build'],
    },
    public: {
      http: ['https://rpc.linea.build'],
      webSocket: ['wss://rpc.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://lineascan.build/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11' as Address,
      blockCreated: 0,
    },
  },
  testnet: false,
};

const lineaTestnet = {
  id: 59140,
  name: 'Linea Goerli Testnet',
  network: 'linea-testnet',
  nativeCurrency: {
    name: 'Linea Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    infura: {
      http: ['https://linea-goerli.infura.io/v3'],
      webSocket: ['wss://linea-goerli.infura.io/v3'],
    },
    default: {
      http: ['https://rpc.goerli.linea.build'],
      webSocket: ['wss://rpc.goerli.linea.build'],
    },
    public: {
      http: ['https://rpc.goerli.linea.build'],
      webSocket: ['wss://rpc.goerli.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://goerli.lineascan.build',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11' as Address,
      blockCreated: 498623,
    },
  },
  testnet: true,
};

export { lineaMainnet, lineaTestnet };
