/* eslint-disable import/no-extraneous-dependencies */
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { configureChains } from '@wagmi/core';
import { mainnet, goerli } from '@wagmi/core/chains';
import { ConnectKitProvider } from 'connectkit';
import type { GatsbyBrowser } from 'gatsby';
import { WagmiConfig, createConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { Layout, SnapsProvider } from './components';
import { messages } from './locales/en/messages';
import { createStore } from './store';

import { getConfig } from '@/utils/config/config';
import { lineaMainnet, lineaTestnet } from '@/utils/customChains';

// eslint-disable-next-line import/no-unassigned-import, import/extensions
import './assets/fonts/fonts.css';

/* Wagmi */
const config = getConfig();

const { chains, publicClient } = configureChains(
  [mainnet, goerli, lineaMainnet, lineaTestnet],
  [infuraProvider({ apiKey: config.infuraId }), publicProvider()],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: config.walletConnectId,
      },
    }),
  ],
  publicClient,
});

i18n.load('en', messages);
i18n.activate('en');

/**
 * Wrap every page in the specified components. This can be used to wrap pages
 * in things like the Layout component. Providers should be specified in the
 * {@link wrapRootElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param props - The props provided by Gatsby.
 * @param props.element - The page element to wrap.
 * @returns The wrapped page element.
 */
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <Layout>{element}</Layout>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

/**
 * Wrap every page in the specified components. This can be used to wrap the
 * root in provider components. Layout components should be specified in the
 * {@link wrapPageElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param props - The props provided by Gatsby.
 * @param props.element - The root element to wrap.
 * @returns The wrapped root element.
 */
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  // Store needs to be created here instead of in the SnapsProvider component.
  // Otherwise, the store will be recreated on every page change, which will
  // cause the state to be reset.
  const store = createStore();

  return (
    <SnapsProvider store={store}>
      <I18nProvider i18n={i18n}>{element}</I18nProvider>
    </SnapsProvider>
  );
};
