import { act } from 'react-dom/test-utils';
import { useEnsName } from 'wagmi';

import { MetadataItems } from './MetadataItems';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('wagmi', () => ({
  ...jest.requireActual('wagmi'),
  useEnsName: jest.fn(),
}));

const buildEnsNameMock = (name?: string, isLoading = false) => {
  const mockUseEnsName = useEnsName as jest.Mock;
  mockUseEnsName.mockImplementation(() => ({
    data: name,
    isLoading,
  }));
};

describe('MetadataItems', () => {
  it('renders the developer', async () => {
    buildEnsNameMock('ens.mock.name');
    const { queryByText, getByText } = render(
      <MetadataItems address={VALID_ACCOUNT_1} />,
    );

    expect(queryByText('ens.mock.name')).toBeInTheDocument();

    const link = getByText('ens.mock.name');

    await act(async () => link.click());
  });

  it('renders the developer without ens name', () => {
    buildEnsNameMock(undefined);
    const { queryByText } = render(<MetadataItems address={VALID_ACCOUNT_1} />);

    expect(queryByText('ens.mock.name')).not.toBeInTheDocument();
  });
});
