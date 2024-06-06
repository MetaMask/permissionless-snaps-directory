import { useEnsName } from 'wagmi';

import { UserNodeTooltip } from './UserNodeTooltip';
import { VALID_ACCOUNT_1, render } from '../utils/test-utils';

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
  createConfig: jest.fn(),
  mainnet: { id: 1 },
}));

const buildEnsNameMock = (name?: string, isLoading = false) => {
  const mockUseEnsName = useEnsName as jest.Mock;
  mockUseEnsName.mockImplementation(() => ({
    data: name,
    isLoading,
  }));
};

describe('UserNodeTooltip', () => {
  it('displays address and ENS name if available', () => {
    const address = VALID_ACCOUNT_1;
    buildEnsNameMock('ens.mock.name');

    const { getByText } = render(<UserNodeTooltip address={address} />);

    const addressElement = getByText(`Address: ${address}`);
    const ensNameElement = getByText(`ENS: ens.mock.name`);

    expect(addressElement).toBeInTheDocument();
    expect(ensNameElement).toBeInTheDocument();
  });

  it('displays only address if ENS name is not available', () => {
    const address = VALID_ACCOUNT_1;
    // Mock the useEnsName hook to return no data
    buildEnsNameMock('');

    const { getByText, queryByText } = render(
      <UserNodeTooltip address={address} />,
    );

    const addressElement = getByText(`Address: ${address}`);
    const ensNameElement = queryByText(/^ENS:/u); // Regular expression to match text starting with "ENS:"

    expect(addressElement).toBeInTheDocument();
    expect(ensNameElement).not.toBeInTheDocument();
  });
});
