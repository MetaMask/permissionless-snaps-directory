import { describe } from '@jest/globals';
import { getAddress } from 'viem';

import AccountProfilePage, { Head } from './[address]';
import { render, getMockSiteMetadata } from '../../utils/test-utils';

jest.mock('../../features/account/components/AccountInfo', () => ({
  AccountInfo: () => <div />,
}));

jest.mock('viem', () => ({
  getAddress: jest.fn(),
}));

describe('Account Profile page', () => {
  let mockGetAddress: jest.Mock;

  beforeEach(() => {
    mockGetAddress = getAddress as jest.Mock;
    mockGetAddress.mockClear();
  });

  it('renders', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);

    const { queryByTestId } = render(
      <AccountProfilePage params={{ address }} />,
    );

    expect(queryByTestId('account-profile-not-found')).not.toBeInTheDocument();
    expect(queryByTestId('account-profile')).toBeInTheDocument();
  });

  it('renders not found page if parameter `address` is incorrect', async () => {
    mockGetAddress.mockImplementation(() => {
      throw new Error('Incorrect address');
    });

    const { queryByTestId } = render(
      <AccountProfilePage params={{ address: 'incorrect-address' }} />,
    );

    expect(queryByTestId('account-profile-not-found')).toBeInTheDocument();
    expect(queryByTestId('account-profile')).not.toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(
        <Head
          data={{
            ...getMockSiteMetadata(),
          }}
        />,
      );
      expect(
        queryByText('MetaMask Snaps Directory - Account Profile'),
      ).toBeInTheDocument();
    });
  });
});
