import { UsersList } from './UsersList';
import { useSelector } from '../../hooks';
import { render } from '../../utils/test-utils';
import { TrustScoreScope } from '../account/trust-score/types';

jest.mock('../../hooks');

jest.mock('../account', () => ({
  AccountCardShort: () => <div data-testid="account-card-short" />,
}));

const mockUsers = [
  {
    accountId: 'developer1',
    result: 1,
    trustScoreScope: TrustScoreScope.SoftwareDevelopment,
    accuracy: 0.6,
    rank: 3,
  },
  {
    accountId: 'developer2',
    result: 2,
    trustScoreScope: TrustScoreScope.SoftwareDevelopment,
    accuracy: 0.4,
    rank: 4,
  },
  {
    accountId: 'auditor1',
    result: 1,
    trustScoreScope: TrustScoreScope.SoftwareSecurity,
    accuracy: 0.9,
    rank: 1,
  },
  {
    accountId: 'auditor2',
    result: 2,
    trustScoreScope: TrustScoreScope.SoftwareSecurity,
    accuracy: 0.8,
    rank: 2,
  },
];

describe('CommunityList', () => {
  let mockUseSelector: jest.Mock;
  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
  });

  it('renders all users', () => {
    mockUseSelector.mockReturnValueOnce(mockUsers);
    mockUseSelector.mockReturnValueOnce([]);

    const { queryAllByTestId } = render(<UsersList />);

    expect(queryAllByTestId('account-card-short')).toHaveLength(
      mockUsers.length,
    );
  });
});
