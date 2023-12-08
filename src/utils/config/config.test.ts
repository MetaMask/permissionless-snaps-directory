describe('config module', () => {
  beforeEach(() => {
    // eslint-disable-next-line n/no-process-env
    process.env.GATSBY_PUBLIC_INFURA_ID = 'mockInfuraId';
    // eslint-disable-next-line n/no-process-env
    process.env.GATSBY_PUBLIC_WALLET_CONNECT_ID = 'mockWalletConnectId';
  });

  it('validates correct configuration without throwing', async () => {
    const { getConfig } = await import('./config');
    const { configSchema } = await import('./config-schema');
    const config = getConfig();
    expect(() => configSchema(config)).not.toThrow();
  });

  it('throws an error for invalid configuration', async () => {
    const { configSchema } = await import('./config-schema');
    const invalidConfig = { infuraId: '', walletConnectId: '' };
    expect(() => configSchema(invalidConfig)).toThrow(
      '`infuraId` is required and cannot be empty.',
    );
  });

  it('getConfiguration should return a valid config object', async () => {
    const { getConfiguration, getConfig } = await import('./config');
    const expectedConfig = getConfig();
    const configuration = await getConfiguration();
    expect(configuration).toStrictEqual(expectedConfig);
  });

  it('handles missing environment variables', async () => {
    // eslint-disable-next-line n/no-process-env
    delete process.env.GATSBY_PUBLIC_INFURA_ID;
    // eslint-disable-next-line n/no-process-env
    delete process.env.GATSBY_PUBLIC_WALLET_CONNECT_ID;
    jest.resetModules();
    const { getConfig } = await import('./config');
    const config = getConfig();
    expect(config.infuraId).toBe('');
    expect(config.walletConnectId).toBe('');
  });
});
