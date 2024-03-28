import { act } from 'react-dom/test-utils';
import { useEnsName } from 'wagmi';

import { MetadataAuditItem } from './MetadataAuditItem';
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

describe('MetadataAuditItem', () => {
  it('renders the auditors', async () => {
    buildEnsNameMock('ens.mock.name');
    const { queryByText, getByText } = render(
      <MetadataAuditItem auditorAddresses={[VALID_ACCOUNT_1]} />,
    );

    expect(queryByText('ens.mock.name')).toBeInTheDocument();

    const link = getByText('ens.mock.name');

    await act(async () => link.click());
  });

  it('renders the auditors without ens names', () => {
    buildEnsNameMock(undefined);
    const { queryByText } = render(
      <MetadataAuditItem auditorAddresses={[VALID_ACCOUNT_1]} />,
    );

    expect(queryByText('ens.mock.name')).not.toBeInTheDocument();
  });
});
