/* eslint-disable no-restricted-globals */
import type { Config } from './config-schema';
import { configSchema } from './config-schema';

/**
 * Generates and returns the application configuration.
 *
 * This function constructs the configuration object using the current environment variables.
 *
 * @returns The application's configuration object.
 */
export const getConfig = (): Config => ({
  infuraId: process.env.GATSBY_PUBLIC_INFURA_ID ?? '',
  walletConnectId: process.env.GATSBY_PUBLIC_WALLET_CONNECT_ID ?? '',
});

/**
 * Retrieves and validates the application configuration.
 *
 * This function returns a promise that resolves to the application's configuration object.
 * It validates the configuration using the custom `configSchema` function. If the validation
 * fails, the function throws an error, otherwise, it returns the valid configuration.
 *
 * @returns A promise that resolves to the validated configuration object.
 */
export async function getConfiguration(): Promise<Config> {
  const config = getConfig();
  const validConfig = configSchema(config);
  return validConfig;
}

// Schema validation
getConfiguration()
  .then((validConfig) => {
    console.info('Configuration is valid:', validConfig);
  })
  .catch((error) => {
    console.info('Invalid config:', error.message);
  });
