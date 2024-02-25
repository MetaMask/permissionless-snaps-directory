import { act } from '@testing-library/react';
import { mock } from 'ts-mockito';
import { useAccount, useEnsName } from 'wagmi';

import { AccountInfo } from './AccountInfo';
import { useSelector, useVerifiableCredential } from '../../../hooks';
import { createStore } from '../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../utils/test-utils';
import { type AccountTrustScoreState } from '../trust-score/store';

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useSelector: jest.fn(),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
  useAccount: jest.fn(),
  useNetwork: () => ({
    data: {
      chainId: 1,
    },
  }),
  createConfig: jest.fn(),
}));

jest.mock('./AccountRoleTags', () => ({
  AccountRoleTags: () => <div data-testid="account-role-tags" />,
}));

jest.mock('./modals', () => ({
  AddToUserCircleModal: () => <div data-testid="user-circle-modal" />,
}));

jest.mock('..', () => ({
  MoreOptionMenu: () => <div data-testid="more-options" />,
}));

describe('AccountInfo', () => {
  let mockUseEnsName: jest.Mock;
  let mockUseAccount: jest.Mock;
  let mockUseSelector: jest.Mock;
  let mockUseVerifiableCredential: jest.Mock;

  beforeEach(() => {
    mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValueOnce([mock<AccountTrustScoreState>]);
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
    expect(queryByTestId('account-role-tags')).toBeInTheDocument();
    expect(queryByTestId('more-options')).toBeInTheDocument();
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
