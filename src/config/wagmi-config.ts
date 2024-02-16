import { configureChains } from '@wagmi/core';
import { linea, lineaTestnet, mainnet } from '@wagmi/core/chains';
import { createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [linea, lineaTestnet, mainnet],
  [publicProvider()],
);

export const WAGMI_CONFIG = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
});
