export type Config = {
  infuraId: string;
  walletConnectId: string;
};

export const configSchema = (config: Config): Config => {
  if (!config.infuraId || config.infuraId.trim() === '') {
    throw new Error('infuraId is required and cannot be empty');
  }
  if (!config.walletConnectId || config.walletConnectId.trim() === '') {
    throw new Error('walletConnectId is required and cannot be empty');
  }
  return config;
};
