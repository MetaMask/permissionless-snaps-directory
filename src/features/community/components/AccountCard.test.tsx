import { useAccount, useEnsName } from 'wagmi';

import { AccountCard } from './AccountCard';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';
import { TrustScoreScope } from '../../account/trust-score/types';

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

describe('AccountCard', () => {
  const mockTrustScore = {
    accountId: 'accountId',
    result: 5,
    accuracy: 0.8,
    trustScoreScope: TrustScoreScope.SoftwareDevelopment,
  };
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
      <AccountCard accountId={mockAccountId} trustScore={mockTrustScore} />,
    );

    expect(queryByText('name')).toBeInTheDocument();
    expect(queryByText('View')).toBeInTheDocument();
  });

  it('renders the account card correctly when ens name does not exist', () => {
    mockUseEnsName.mockImplementation(() => ({
      isLoading: false,
    }));
    const { queryByText } = render(
      <AccountCard accountId={mockAccountId} trustScore={mockTrustScore} />,
    );

    expect(queryByText('Developer')).toBeInTheDocument();
  });
});
