import { MetadataItems } from './MetadataItems';
import { useVerifiableCredential } from '../../../hooks';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('../../../hooks');

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
}));

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

describe('MetadataItems', () => {
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

  it('renders the developer entity', async () => {
    const { queryByText, queryByTestId } = render(
      <MetadataItems address={VALID_ACCOUNT_1} />,
    );

    expect(queryByText('Developer')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
