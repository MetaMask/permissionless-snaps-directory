import { act } from '@testing-library/react';
import { useAccount, useEnsName } from 'wagmi';

import { AccountCard } from './AccountCard';
import { render, VALID_ACCOUNT_1 } from '../../../utils/test-utils';
import { TrustScoreScope } from '../../account/trust-score/types';

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

jest.mock('../../account/components/AccountRoleTags', () => ({
  AccountRoleTags: () => <div data-testid="account-role-tags" />,
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
    const { queryByText, queryAllByTestId } = render(
      <AccountCard accountId={mockAccountId} trustScore={mockTrustScore} />,
    );

    expect(queryByText('name')).toBeInTheDocument();
    expect(queryByText('View')).toBeInTheDocument();
    expect(queryAllByTestId('account-role-tags')).toHaveLength(1);
  });

  it('renders the account card correctly when ens name does not exist', () => {
    mockUseEnsName.mockImplementation(() => ({
      isLoading: false,
    }));
    const { queryAllByTestId } = render(
      <AccountCard accountId={mockAccountId} trustScore={mockTrustScore} />,
    );

    expect(queryAllByTestId('account-role-tags')).toHaveLength(1);
  });

  it('renders the account card without AccountRoleTags if trustscore is not provided', () => {
    const { queryAllByTestId } = render(
      <AccountCard accountId={mockAccountId} />,
    );

    expect(queryAllByTestId('account-role-tags')).toHaveLength(0);
  });

  it('renders the account card with snap name', () => {
    const { queryAllByTestId, queryByText } = render(
      <AccountCard
        accountId={mockAccountId}
        trustScore={mockTrustScore}
        snapName="Snap1"
      />,
    );

    expect(queryByText('name [Snap1]')).toBeInTheDocument();
    expect(queryAllByTestId('account-role-tags')).toHaveLength(1);
  });

  it('renders the account card with accountId starting with 0x', () => {
    const accountIdStartingWith0x = VALID_ACCOUNT_1;
    const { queryAllByTestId, queryByText } = render(
      <AccountCard
        accountId={accountIdStartingWith0x}
        trustScore={mockTrustScore}
        snapName="Snap1"
      />,
    );

    expect(queryByText('name [Snap1]')).toBeInTheDocument();
    expect(queryAllByTestId('account-role-tags')).toHaveLength(1);
  });

  it('calls the default onClick handler when clicked if no onClick handler is provided', async () => {
    const { getByRole } = await act(() =>
      render(
        <AccountCard accountId={mockAccountId} trustScore={mockTrustScore} />,
      ),
    );

    expect(() => act(() => getByRole('link').click())).not.toThrow();
  });

  it('calls the onClick handler when clicked', async () => {
    const onClick = jest.fn();

    const { getByRole } = await act(() =>
      render(
        <AccountCard
          accountId={mockAccountId}
          trustScore={mockTrustScore}
          onClick={onClick}
        />,
      ),
    );

    act(() => getByRole('link').click());

    expect(onClick).toHaveBeenCalled();
  });
});
