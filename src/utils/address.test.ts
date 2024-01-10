import { getAddress } from 'viem';

import { parseAddress } from './address';

jest.mock('viem', () => ({
  getAddress: jest.fn(),
}));

describe('parseAddress', () => {
  let mockGetAddress: jest.Mock;

  beforeEach(() => {
    mockGetAddress = getAddress as jest.Mock;
    mockGetAddress.mockClear();
  });

  it('return address if parse address successfully', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);

    expect(parseAddress(address)).toStrictEqual(address);
  });

  it('return null if parse address failed', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockImplementation(() => {
      throw new Error('Incorrect address');
    });

    expect(parseAddress(address)).toBeNull();
  });
});
