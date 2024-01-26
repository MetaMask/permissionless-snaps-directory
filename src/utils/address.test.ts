import { getAddress } from 'viem';

import { parseAddress } from './address';
import { VALID_ACCOUNT_1 } from './test-utils';

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
    const address = VALID_ACCOUNT_1;
    mockGetAddress.mockReturnValue(address);

    expect(parseAddress(address)).toStrictEqual(address);
  });

  it('return null if parse address failed', async () => {
    const address = VALID_ACCOUNT_1;
    mockGetAddress.mockImplementation(() => {
      throw new Error('Incorrect address');
    });

    expect(parseAddress(address)).toBeNull();
  });
});
