export const createConfig = () => ({});

export const MetaMaskConnector = () => ({});

export const WalletConnectConnector = () => ({});

export const infuraProvider = () => ({});

export const publicProvider = () => ({});

type MockWagmiConfigProps = {
  children: React.ReactNode;
};

export const WagmiConfig: React.FC<MockWagmiConfigProps> = ({ children }) => (
  <div className="mock-wagmi-config">{children}</div>
);
