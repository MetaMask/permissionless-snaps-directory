import { configureChains } from '@wagmi/core';
import { linea, lineaTestnet } from '@wagmi/core/chains';
import { createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/dist/connectors/metaMask';
import { publicProvider } from 'wagmi/dist/providers/public';

const { chains, publicClient } = configureChains(
  [linea, lineaTestnet],
  [publicProvider()],
);

export const WAGMI_CONFIG = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
});
