import { describe } from '@jest/globals';
import { getAddress } from 'viem';
import { useAccount } from 'wagmi';

import AccountProfilePage, { Head } from '.';
import { useDispatch } from '../../hooks';
import {
  getMockSiteMetadata,
  render,
  VALID_ACCOUNT_1,
} from '../../utils/test-utils';

jest.mock('../../features/account/components/AccountInfo', () => ({
  AccountInfo: () => <div />,
}));

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useDispatch: jest.fn(),
}));

jest.mock('../../hooks/useVerifiableCredential', () => ({
  useVerifiableCredential: () => ({
    signMessage: jest.fn(),
    signError: null,
    accountVCBuilder: {
      // TODO: use `ACCOUNT_1` instead of a full address
      getSubjectDid: jest
        .fn()
        .mockReturnValue('0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7'),
      getIssuerDid: jest.fn().mockReturnValue('issuerAddress'),
    },
  }),
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

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('Account Profile page', () => {
  let mockGetAddress: jest.Mock;
  let mockUseAccount: jest.Mock;
  let mockUseDispatch: jest.Mock;

  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () => Promise.resolve());
    mockGetAddress = getAddress as jest.Mock;
    mockUseAccount = useAccount as jest.Mock;
    mockGetAddress.mockClear();
    mockUseAccount.mockClear();
  });

  it('renders', async () => {
    const address = VALID_ACCOUNT_1;
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

  it('renders even when fetchAccountAssertionsForAccountId fails', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );

    const address = VALID_ACCOUNT_1;
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

  it('renders not found page if parameter `address` is incorrect', async () => {
    const address = VALID_ACCOUNT_1;
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
    expect(queryByText('Report')).not.toBeInTheDocument();
    expect(queryByText('Endorse')).not.toBeInTheDocument();
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
    expect(queryByText('Report')).toBeInTheDocument();
    expect(queryByText('Endorse')).toBeInTheDocument();
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
    expect(queryByText('Report')).not.toBeInTheDocument();
    expect(queryByText('Endorse')).not.toBeInTheDocument();
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
