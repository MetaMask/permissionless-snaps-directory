/* eslint-disable n/no-process-env */
describe('config module', () => {
  const setupTestEnvironment = () => {
    process.env.GATSBY_PUBLIC_INFURA_ID = 'mockInfuraId';
    process.env.GATSBY_PUBLIC_WALLET_CONNECT_ID = 'mockWalletConnectId';
  };

  beforeEach(() => {
    jest.resetModules(); // Clear module cache
    setupTestEnvironment();
  });
  it('validates correct configuration without throwing', async () => {
    const { getConfig } = await import('./config');
    const { configSchema } = await import('./config.schema');
    const config = getConfig();
    expect(() => configSchema(config)).not.toThrow();
  });

  it('throws an error for invalid configuration', async () => {
    const { configSchema } = await import('./config.schema');
    const invalidConfig = { infuraId: '', walletConnectId: '' };
    expect(() => configSchema(invalidConfig)).toThrow(
      'infuraId is required and cannot be empty',
    );
  });

  it('getConfiguration should return a valid config object', async () => {
    const { getConfiguration, getConfig } = await import('./config');
    const expectedConfig = getConfig();
    const configuration = await getConfiguration();
    expect(configuration).toStrictEqual(expectedConfig);
  });

  it('handles missing environment variables', async () => {
    delete process.env.GATSBY_PUBLIC_INFURA_ID;
    delete process.env.GATSBY_PUBLIC_WALLET_CONNECT_ID;
    jest.resetModules();
    const { getConfig } = await import('./config');
    const config = getConfig();
    expect(config.infuraId).toBe('');
    expect(config.walletConnectId).toBe('');
  });
});
