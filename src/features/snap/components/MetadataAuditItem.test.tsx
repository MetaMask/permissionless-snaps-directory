import { MetadataAuditItem } from './MetadataAuditItem';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
}));

jest.mock('../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

describe('MetadataAuditItem', () => {
  it('renders the auditor entity', async () => {
    const { queryByText, queryByTestId } = render(
      <MetadataAuditItem auditorAddresses={[VALID_ACCOUNT_1]} />,
    );

    expect(queryByText('Audited By')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
