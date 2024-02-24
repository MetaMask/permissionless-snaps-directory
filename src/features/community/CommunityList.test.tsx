import { CommunityList } from './CommunityList';
import { useSelector } from '../../hooks';
import { render } from '../../utils/test-utils';
import { TrustScoreScope } from '../account/trust-score/types';

jest.mock('../../hooks');

jest.mock('./components', () => ({
  AccountCardShort: () => <div data-testid="account-card-short" />,
}));

const mockTopDevelopers = [
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
];

const mockTopAuditors = [
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

  it('renders top community developers', () => {
    mockUseSelector.mockReturnValueOnce(mockTopDevelopers);
    mockUseSelector.mockReturnValueOnce([]);

    const { queryAllByTestId } = render(<CommunityList />);

    expect(queryAllByTestId('account-card-short')).toHaveLength(
      mockTopDevelopers.length + 6, // 6 is the number of authors hardcoded
    );
  });

  it('renders top community security reviewers', () => {
    mockUseSelector.mockReturnValueOnce([]);
    mockUseSelector.mockReturnValueOnce(mockTopAuditors);

    const { queryAllByTestId } = render(<CommunityList />);

    expect(queryAllByTestId('account-card-short')).toHaveLength(
      mockTopAuditors.length + 6, // 6 is the number of authors hardcoded
    );
  });
});
