import { MetadataItems } from './MetadataItems';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
}));

jest.mock('../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

describe('MetadataItems', () => {
  it('renders the developer entity', async () => {
    const { queryByText, queryByTestId } = render(
      <MetadataItems address={VALID_ACCOUNT_1} />,
    );

    expect(queryByText('Developer')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
