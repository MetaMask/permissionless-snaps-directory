import type React from 'react';

const createConfig = () => ({});

const MetaMaskConnector = () => ({});

const WalletConnectConnector = () => ({});

const infuraProvider = () => ({});

const publicProvider = () => ({});

type MockWagmiConfigProps = {
  children: React.ReactNode;
};

const WagmiConfig: React.FC<MockWagmiConfigProps> = ({ children }) => (
  <div className="mock-wagmi-config">{children}</div>
);

export {
  WagmiConfig,
  createConfig,
  MetaMaskConnector,
  WalletConnectConnector,
  infuraProvider,
  publicProvider,
};
