import { configureChains } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

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
