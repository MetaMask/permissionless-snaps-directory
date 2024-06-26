import { describe } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import { useAccount } from 'wagmi';

import SnapPage, { Head } from './{Snap.slug}';
import {
  getMockSiteMetadata,
  getMockSnap,
  render,
  VALID_ACCOUNT_1,
} from '../../../utils/test-utils';

jest.mock('../../../features', () => ({
  ...jest.requireActual('../../../features'),
  Metadata: () => <div data-testid="metadata" />,
}));

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: () => ({
    issuerAddress: 'issuerAddress',
    signMessage: jest.fn(),
    signError: null,
    snapVCBuilder: {
      getIssuerDid: jest.fn().mockReturnValue('issuerAddress'),
    },
  }),
}));

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  createConfig: jest.fn(),
}));

describe('Snap page', () => {
  let mockUseAccount: jest.Mock;

  beforeEach(() => {
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
  });

  it('renders', async () => {
    mockUseAccount.mockReturnValue({
      isConnected: true,
      address: VALID_ACCOUNT_1,
    });

    const { queryAllByText } = await act(() =>
      render(<SnapPage data={getMockSnap({ name: 'Foo Snap' })} />),
    );

    expect(queryAllByText('Foo Snap')).toHaveLength(3);
  });

  it('renders the report button if the user is connected', async () => {
    mockUseAccount.mockReturnValue({
      isConnected: true,
      address: VALID_ACCOUNT_1,
    });

    const { queryByText } = await act(() =>
      render(<SnapPage data={getMockSnap({ name: 'Foo Snap' })} />),
    );

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('does not render the report button if the user is not connected', async () => {
    mockUseAccount.mockReturnValue({ isConnected: false, address: undefined });

    const { queryByText } = await act(() =>
      render(<SnapPage data={getMockSnap({ name: 'Foo Snap' })} />),
    );

    expect(queryByText('Report')).not.toBeInTheDocument();
  });

  it('renders the endorse button if the user is connected', async () => {
    mockUseAccount.mockReturnValue({
      isConnected: true,
      address: VALID_ACCOUNT_1,
    });

    const { queryByText } = await act(() =>
      render(<SnapPage data={getMockSnap({ name: 'Foo Snap' })} />),
    );

    expect(queryByText('Endorse')).toBeInTheDocument();
  });

  it('does not render the endorse button if the user is not connected', async () => {
    mockUseAccount.mockReturnValue({ isConnected: false, address: undefined });

    const { queryByText } = await act(() =>
      render(<SnapPage data={getMockSnap({ name: 'Foo Snap' })} />),
    );

    expect(queryByText('Endorse')).not.toBeInTheDocument();
  });

  it('does not render the installation button if `onboard` is enabled', async () => {
    mockUseAccount.mockReturnValue({
      isConnected: true,
      address: VALID_ACCOUNT_1,
    });

    const { queryByText } = await act(() =>
      render(
        <SnapPage data={getMockSnap({ name: 'Foo Snap', onboard: true })} />,
      ),
    );

    expect(queryByText('Add to MetaMask')).not.toBeInTheDocument();
  });

  it('does not render the support section if the Snap has no support links', async () => {
    mockUseAccount.mockReturnValue({
      isConnected: true,
      address: VALID_ACCOUNT_1,
    });

    const { queryByText } = await act(() =>
      render(
        <SnapPage data={getMockSnap({ name: 'Foo Snap', support: {} })} />,
      ),
    );

    expect(queryByText('Contact')).not.toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(
        <Head
          data={{
            ...getMockSnap({ name: 'Foo Snap' }),
            ...getMockSiteMetadata(),
          }}
        />,
      );
      expect(
        queryByText('Foo Snap on the MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
