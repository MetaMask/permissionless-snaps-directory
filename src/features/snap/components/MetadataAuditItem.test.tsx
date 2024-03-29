import { MetadataAuditItem } from './MetadataAuditItem';
import { useVerifiableCredential } from '../../../hooks';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
}));

jest.mock('../../../hooks');

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

describe('MetadataAuditItem', () => {
  let mockUseVerifiableCredential: jest.Mock;
  beforeEach(() => {
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      accountVCBuilder: {
        getSubjectDid: jest.fn().mockReturnValue(VALID_ACCOUNT_1),
      },
    });
  });

  it('renders the auditor entity', async () => {
    const { queryByText, queryByTestId } = render(
      <MetadataAuditItem auditorAddresses={[VALID_ACCOUNT_1]} />,
    );

    expect(queryByText('Audited By')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
