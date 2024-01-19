import { describe } from '@jest/globals';
import { getAddress } from 'viem';

import AccountProfilePage, { Head } from '.';
import { render, getMockSiteMetadata } from '../../utils/test-utils';
import { VALID_ACCOUNT_1 } from '../../utils/test-utils/input';

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
    const address = VALID_ACCOUNT_1;
    mockGetAddress.mockReturnValue(address);
    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(
      queryByText("The page you're looking for can't be found."),
    ).not.toBeInTheDocument();
    expect(queryByText('Edit Profile')).toBeInTheDocument();
  });

  it('renders not found page if parameter `address` is incorrect', async () => {
    const address = VALID_ACCOUNT_1;
    mockGetAddress.mockImplementation(() => {
      throw new Error('Incorrect address');
    });
    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(
      queryByText("The page you're looking for can't be found."),
    ).toBeInTheDocument();
    expect(queryByText('Edit Profile')).not.toBeInTheDocument();
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
