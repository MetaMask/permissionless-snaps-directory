import { describe } from '@jest/globals';
import { getAddress } from 'viem';
import { useAccount } from 'wagmi';

import AccountProfilePage, { Head } from '.';
import { render, getMockSiteMetadata } from '../../utils/test-utils';

jest.mock('../../features/account/components/AccountInfo', () => ({
  AccountInfo: () => <div />,
}));

jest.mock('viem', () => ({
  getAddress: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useEnsName: () => ({
    data: {
      name: 'test.eth',
    },
    loading: false,
  }),
}));

describe('Account Profile page', () => {
  let mockGetAddress: jest.Mock;
  let mockUseAccount: jest.Mock;

  beforeEach(() => {
    mockGetAddress = getAddress as jest.Mock;
    mockUseAccount = useAccount as jest.Mock;
    mockGetAddress.mockClear();
    mockUseAccount.mockClear();
  });

  it('renders', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);
    mockUseAccount.mockReturnValue({
      address: null,
      isConnected: false,
    });

    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText, queryByTestId } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(
      queryByText("The page you're looking for can't be found."),
    ).not.toBeInTheDocument();
    expect(queryByTestId('account-info')).toBeInTheDocument();
  });

  it('renders not found page if query parameter `address` is incorrect', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockUseAccount.mockReturnValue({
      address: null,
      isConnected: false,
    });
    mockGetAddress.mockImplementation(() => {
      throw new Error('Incorrect address');
    });
    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText, queryByTestId } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(
      queryByText("The page you're looking for can't be found."),
    ).toBeInTheDocument();
    expect(queryByTestId('account-info')).not.toBeInTheDocument();
  });

  it('renders edit button if the connected address is equal to query parameter `address`', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);
    mockUseAccount.mockReturnValue({
      address,
      isConnected: true,
    });

    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(queryByText('Edit Profile')).toBeInTheDocument();
    expect(queryByText('Endose')).not.toBeInTheDocument();
  });

  it('does not render edit button if connected address not equal to query parameter `address`', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);
    mockUseAccount.mockReturnValue({
      address: '0x6B24aE0ABbeb67058D07b891aF415f288eA57000',
      isConnected: true,
    });

    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(queryByText('Edit Profile')).not.toBeInTheDocument();
    expect(queryByText('Endose')).toBeInTheDocument();
  });

  it('does not render edit button if account is not connected', async () => {
    const address = '0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7';
    mockGetAddress.mockReturnValue(address);
    mockUseAccount.mockReturnValue({
      address: null,
      isConnected: false,
    });

    const mockLocationSearchParam = {
      search: new URLSearchParams({ address }),
    };

    const { queryByText } = render(
      <AccountProfilePage location={mockLocationSearchParam} />,
    );

    expect(queryByText('Edit Profile')).not.toBeInTheDocument();
    expect(queryByText('Endose')).not.toBeInTheDocument();
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
