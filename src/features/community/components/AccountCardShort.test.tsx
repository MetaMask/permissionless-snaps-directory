import { useAccount, useEnsName } from 'wagmi';

import { AccountCardShort } from './AccountCardShort';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  navigate: jest.fn(),
}));

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
  useAccount: jest.fn(),
  useNetwork: () => ({
    data: {
      chainId: 1,
    },
  }),
}));

describe('AccountCardShort', () => {
  let mockUseEnsName: jest.Mock;
  let mockUseAccount: jest.Mock;
  beforeEach(() => {
    mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
    mockUseEnsName.mockImplementation(() => ({
      data: 'name',
      isLoading: false,
    }));
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
    mockUseAccount.mockImplementation(() => ({
      address: VALID_ACCOUNT_1,
      isConnected: true,
    }));
  });

  const mockAccountId = `did:pkh:eip155:1:${VALID_ACCOUNT_1}`;

  it('renders the account card correctly', () => {
    const { queryByText } = render(
      <AccountCardShort accountId={mockAccountId} />,
    );

    expect(queryByText('name')).toBeInTheDocument();
    expect(queryByText('View')).toBeInTheDocument();
  });

  it('renders the account card correctly when ens name does not exist', () => {
    mockUseEnsName.mockImplementation(() => ({
      isLoading: false,
    }));
    const { queryByText } = render(
      <AccountCardShort accountId={mockAccountId} />,
    );

    expect(queryByText('View')).toBeInTheDocument();
  });

  it('renders the account card with accountId starting with 0x', () => {
    const accountIdStartingWith0x = VALID_ACCOUNT_1;
    const { queryByText } = render(
      <AccountCardShort accountId={accountIdStartingWith0x} />,
    );

    expect(queryByText('name')).toBeInTheDocument();
    expect(queryByText('View')).toBeInTheDocument();
  });
});
