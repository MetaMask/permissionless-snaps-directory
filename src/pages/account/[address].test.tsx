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

    const { queryByText } = render(<AccountProfilePage params={{ address }} />);

    expect(
      queryByText("The page you're looking for can't be found."),
    ).not.toBeInTheDocument();
    expect(queryByText('Edit Profile')).toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(<Head data={getMockSiteMetadata()} />);
      expect(
        queryByText('MetaMask Snaps Directory - Account Profile'),
      ).toBeInTheDocument();
    });
  });
});
