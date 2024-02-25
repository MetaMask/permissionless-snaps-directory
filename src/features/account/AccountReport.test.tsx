import { act, waitFor } from '@testing-library/react';
import { useEnsName } from 'wagmi';

import { AccountReport } from './AccountReport';
import {
  createAccountAssertion,
  fetchAccountAssertionsForAccountId,
} from './assertions/api';
import { useDispatch, useSelector, useVerifiableCredential } from '../../hooks';
import {
  render,
  VALID_ACCOUNT_1,
  VALID_ACCOUNT_2,
} from '../../utils/test-utils';

jest.mock('../../hooks');

jest.mock('./assertions/api');

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
  createConfig: jest.fn(),
}));

jest.mock('../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

const buildEnsNameMock = (name?: string, isLoading = false) => {
  const mockUseEnsName = useEnsName as jest.Mock;
  mockUseEnsName.mockImplementation(() => ({
    data: name,
    isLoading,
  }));
};

describe('AccountReport', () => {
  let mockUseVerifiableCredential: jest.Mock;
  let mockUseSelector: jest.Mock;
  let mockUseDispatch: jest.Mock;
  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    buildEnsNameMock('ens.mock.name');
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
    mockUseSelector.mockReturnValueOnce(null);
    mockUseSelector.mockReturnValueOnce(false);
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      accountVCBuilder: {
        buildReportAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
        getSubjectDid: jest.fn().mockReturnValue(VALID_ACCOUNT_1),
        getIssuerDid: jest.fn().mockReturnValue(VALID_ACCOUNT_2),
      },
      signError: null,
    });
  });
  it('renders the component', () => {
    const { queryByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );
    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('renders the component without ens name', () => {
    buildEnsNameMock();
    const { queryByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );
    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('shows modal when report button is clicked', async () => {
    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();
  });

  it('does not sign when signature is null', async () => {
    const mockSignMessage = jest.fn();

    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: mockSignMessage,
      accountVCBuilder: {
        buildReportAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
        getSubjectDid: jest.fn().mockReturnValue(VALID_ACCOUNT_1),
        getIssuerDid: jest.fn().mockReturnValue(VALID_ACCOUNT_2),
      },
      signError: null,
    });

    mockSignMessage.mockReturnValue(null);

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();
    await act(async () => getByText('Sign to report').click());
    expect(mockSignMessage).toHaveBeenCalled();

    expect(queryByText('Report')).toBeInTheDocument();
    expect(queryByText('Reported')).not.toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const { queryByText, getByText, getByLabelText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Sign to report')).not.toBeInTheDocument();
  });

  it('displays `Success` toast when reporting is successful', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Success')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(
        createAccountAssertion(expect.anything()),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchAccountAssertionsForAccountId(expect.anything()),
      );
    });
  });

  it('displays `Success` toast when report is successful even when fetchAccountAssertionsForAccountId fails', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Success')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(
        createAccountAssertion(expect.anything()),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchAccountAssertionsForAccountId(expect.anything()),
      );
    });
  });

  it('displays error message when createAccountAssertion is rejected', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'rejected',
      }),
    );

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Error')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        createAccountAssertion(expect.anything()),
      );
    });
  });

  it('displays error message when createAccountAssertion throws execption', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Error')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        createAccountAssertion(expect.anything()),
      );
    });
  });
});
