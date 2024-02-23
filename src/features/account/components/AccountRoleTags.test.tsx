import { AccountRoleTags } from './AccountRoleTags';
import { render } from '../../../utils/test-utils';
import { TrustScoreScope } from '../trust-score/types';

describe('AccountRoleTags component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with multiple trust scores', () => {
    const mockTrustScores = [
      {
        result: 1,
        accuracy: 0.9,
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
      },
      {
        result: 1,
        accuracy: 0.99,
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
      },
    ];

    const { getByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(getByText('Developer')).toBeInTheDocument();
    expect(getByText('Auditor')).toBeInTheDocument();
  });

  it('renders correctly without trust scores', () => {
    const { queryByText } = render(<AccountRoleTags trustScores={[]} />);

    expect(queryByText('Developer')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).not.toBeInTheDocument();
    expect(queryByText('Reported')).not.toBeInTheDocument();
  });

  it('renders correctly with Developer trust scores', () => {
    const mockTrustScores = [
      {
        result: 1,
        accuracy: 0.9,
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
      },
    ];

    const { getByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(getByText('🧑‍💻')).toBeInTheDocument();
    expect(getByText('Developer')).toBeInTheDocument();
  });

  it('renders Auditor Tier 1 role correctly', () => {
    const mockTrustScores = [
      {
        result: 1,
        accuracy: 0.99,
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
      },
    ];

    const { queryByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(queryByText('🥇')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor Tier 2 role correctly', () => {
    const mockTrustScores = [
      {
        result: 1,
        accuracy: 0.92,
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
      },
    ];

    const { queryByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(queryByText('🥈')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor Tier 3 role correctly', () => {
    const mockTrustScores = [
      {
        result: 1,
        accuracy: 0.85,
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
      },
    ];

    const { queryByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(queryByText('🥉')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor with no Tier role correctly', () => {
    const mockTrustScores = [
      {
        result: 1,
        accuracy: 0.7,
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
      },
    ];

    const { queryByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(queryByText('🥇')).not.toBeInTheDocument();
    expect(queryByText('🥈')).not.toBeInTheDocument();
    expect(queryByText('🥉')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor with no Tier role when accuracy is not available', () => {
    const mockTrustScores = [
      { result: 1, trustScoreScope: TrustScoreScope.SoftwareSecurity },
    ];

    const { queryByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(queryByText('🥇')).not.toBeInTheDocument();
    expect(queryByText('🥈')).not.toBeInTheDocument();
    expect(queryByText('🥉')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Reported role correctly', () => {
    const mockTrustScores = [
      { result: -1, trustScoreScope: TrustScoreScope.SoftwareDevelopment },
    ];

    const { queryByText } = render(
      <AccountRoleTags trustScores={mockTrustScores} />,
    );

    expect(queryByText('👹')).toBeInTheDocument();
    expect(queryByText('Reported')).toBeInTheDocument();
  });
});
