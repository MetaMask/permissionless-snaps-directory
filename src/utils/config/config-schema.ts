export type Config = {
  infuraId: string;
  walletConnectId: string;
};

/**
 * Validates the configuration for Infura ID and Wallet Connect ID.
 *
 * @param config - The configuration object to validate.
 * @returns The validated configuration object.
 * @throws Will throw an error if infuraId or walletConnectId is missing or empty.
 */
export function configSchema(config: Config) {
  if (!config.infuraId || config.infuraId.trim() === '') {
    throw new Error('`infuraId` is required and cannot be empty.');
  }

  if (!config.walletConnectId || config.walletConnectId.trim() === '') {
    throw new Error('`walletConnectId` is required and cannot be empty.');
  }

  return config;
}
