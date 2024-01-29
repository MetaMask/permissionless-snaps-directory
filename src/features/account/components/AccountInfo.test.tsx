import { act } from '@testing-library/react';
import { useAccount, useEnsName } from 'wagmi';

import { AccountInfo } from './AccountInfo';
import { createStore } from '../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../utils/test-utils';

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: () => ({
    issuerAddress: 'issuerAddress',
    signMessage: jest.fn(),
    signError: null,
  }),
}));

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
  useAccount: jest.fn(),
  useNetwork: () => ({
    data: {
      chainId: 1,
    },
  }),
}));

describe('AccountInfo', () => {
  let mockUseEnsName: jest.Mock;
  let mockUseAccount: jest.Mock;

  beforeEach(() => {
    mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
  });

  it('renders', async () => {
    const store = createStore();
    mockUseEnsName.mockImplementation(() => ({
      data: 'name',
      isLoading: false,
    }));
    mockUseAccount.mockImplementation(() => ({
      address: VALID_ACCOUNT_1,
      isConnected: true,
    }));

    const { queryByTestId, queryByText } = await act(async () =>
      render(<AccountInfo address={VALID_ACCOUNT_1} />, store),
    );

    expect(queryByTestId('account-info-loading')).not.toBeInTheDocument();
    expect(queryByTestId('account-info')).toBeInTheDocument();
    expect(queryByText('name')).toBeInTheDocument();
    expect(queryByTestId('icon-menu-button')).toBeInTheDocument();
  });

  it('renders loading component if `useEnsName` is not complete', async () => {
    const store = createStore();
    mockUseEnsName.mockImplementation(() => ({
      data: 'name',
      isLoading: true,
    }));
    mockUseAccount.mockImplementation(() => ({
      isConnected: true,
    }));

    const { queryByTestId } = await act(async () =>
      render(<AccountInfo address={VALID_ACCOUNT_1} />, store),
    );

    expect(queryByTestId('account-info-loading')).toBeInTheDocument();
  });

  it('renders trimmed address if ens name is not return from `useEnsName`', async () => {
    const store = createStore();
    mockUseEnsName.mockReturnValue({
      data: null,
      isLoading: false,
    });
    mockUseAccount.mockImplementation(() => ({
      isConnected: true,
    }));

    const { queryByText } = await act(async () =>
      render(<AccountInfo address={VALID_ACCOUNT_1} />, store),
    );
    expect(queryByText('0x6B24a...57Cc7')).toBeInTheDocument();
  });

  it('does not render iconMenu if user is not connected', async () => {
    const store = createStore();
    mockUseEnsName.mockReturnValue({
      data: null,
      isLoading: false,
    });
    mockUseAccount.mockImplementation(() => ({
      isConnected: false,
    }));

    const { queryByTestId } = await act(async () =>
      render(<AccountInfo address={VALID_ACCOUNT_1} />, store),
    );

    expect(queryByTestId('icon-menu-button')).not.toBeInTheDocument();
  });
});
