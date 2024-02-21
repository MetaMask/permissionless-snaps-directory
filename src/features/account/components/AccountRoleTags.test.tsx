import { AccountRoleTags } from './AccountRoleTags';
import { useSelector, useVerifiableCredential } from '../../../hooks';
import { render } from '../../../utils/test-utils';

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useSelector: jest.fn(),
  useVerifiableCredential: jest.fn(),
}));

describe('AccountRoleTags component', () => {
  let mockUseSelector: jest.Mock;
  let mockUseVerifiableCredential: jest.Mock;
  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      accountVCBuilder: {
        buildReportAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
        getSubjectDid: jest.fn().mockReturnValue('0xmockAddress'),
      },
      signError: null,
    });
  });

  it('renders correctly with multiple trust scores', () => {
    const mockTrustScores = [
      { result: 1, accuracy: 0.9, trustScoreScope: 'SoftwareDevelopment' },
      { result: 1, accuracy: 0.99, trustScoreScope: 'SoftwareSecurity' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { getByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(getByText('Developer')).toBeInTheDocument();
    expect(getByText('Auditor')).toBeInTheDocument();
  });

  it('renders correctly without trust scores', () => {
    mockUseSelector.mockReturnValue([]);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('Developer')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).not.toBeInTheDocument();
    expect(queryByText('Reported')).not.toBeInTheDocument();
  });

  it('renders correctly with Developer trust scores', () => {
    const mockTrustScores = [
      { result: 1, accuracy: 0.9, trustScoreScope: 'SoftwareDevelopment' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { getByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(getByText('🧑‍💻')).toBeInTheDocument();
    expect(getByText('Developer')).toBeInTheDocument();
  });

  it('renders Auditor Tier 1 role correctly', () => {
    const mockTrustScores = [
      { result: 1, accuracy: 0.99, trustScoreScope: 'SoftwareSecurity' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('🥇')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor Tier 2 role correctly', () => {
    const mockTrustScores = [
      { result: 1, accuracy: 0.92, trustScoreScope: 'SoftwareSecurity' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('🥈')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor Tier 3 role correctly', () => {
    const mockTrustScores = [
      { result: 1, accuracy: 0.85, trustScoreScope: 'SoftwareSecurity' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('🥉')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor with no Tier role correctly', () => {
    const mockTrustScores = [
      { result: 1, accuracy: 0.7, trustScoreScope: 'SoftwareSecurity' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('🥇')).not.toBeInTheDocument();
    expect(queryByText('🥈')).not.toBeInTheDocument();
    expect(queryByText('🥉')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Auditor with no Tier role when accuracy is not available', () => {
    const mockTrustScores = [
      { result: 1, trustScoreScope: 'SoftwareSecurity' },
    ];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('🥇')).not.toBeInTheDocument();
    expect(queryByText('🥈')).not.toBeInTheDocument();
    expect(queryByText('🥉')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
  });

  it('renders Reported role correctly', () => {
    const mockTrustScores = [{ result: -1, trustScoreScope: 'UnknownScope' }];
    mockUseSelector.mockReturnValue(mockTrustScores);

    const { queryByText } = render(<AccountRoleTags address="0xmockAddress" />);

    expect(queryByText('👹')).toBeInTheDocument();
    expect(queryByText('Reported')).toBeInTheDocument();
  });
});
