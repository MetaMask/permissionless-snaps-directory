import { act } from '@testing-library/react';
import { useAccount } from 'wagmi';

import { SnapReport } from './ReportSnap';
import { useVerifiableCredential } from '../../../hooks';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
}));

describe('ReportSnap', () => {
  let mockUseAccount: jest.Mock;
  let mockUseVerifiableCredential: jest.Mock;

  beforeEach(() => {
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
  });

  it('renders', async () => {
    mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText } = render(
      <SnapReport snapName="Snap1" snapId="Snap1ID" />,
    );

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('should show modal when click report button', async () => {
    mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText, getByText } = render(
      <SnapReport snapName="Snap1" snapId="Snap1ID" />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();
  });

  it('sign should do nothing if account is not connected', async () => {
    const mockSignMessage = jest.fn();
    mockUseAccount.mockReturnValue({ address: undefined });
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: mockSignMessage,
      signError: null,
    });

    const { queryByText, getByText } = render(
      <SnapReport snapName="Snap1" snapId="Snap1ID" />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();

    await act(async () => getByText('Sign to report').click());
    expect(mockSignMessage).not.toHaveBeenCalled();
  });

  it('sign should do nothing when signature is null', async () => {
    const mockSignMessage = jest.fn();
    mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: mockSignMessage,
      snapVCBuilder: {
        buildDisputedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });

    mockSignMessage.mockReturnValue(null);

    const { queryByText, getByText } = render(
      <SnapReport snapName="Snap1" snapId="Snap1ID" />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();
    await act(async () => getByText('Sign to report').click());
    expect(mockSignMessage).toHaveBeenCalled();

    expect(queryByText('Report')).toBeInTheDocument();
    expect(queryByText('Reported')).not.toBeInTheDocument();
  });

  it('should close modal when click close button', async () => {
    mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText, getByText, getByLabelText } = render(
      <SnapReport snapName="Snap1" snapId="Snap1ID" />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Sign to report')).not.toBeInTheDocument();
  });

  it('should display `Success` toast and button label changed to `reported` when report success', async () => {
    mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      snapVCBuilder: {
        buildDisputedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });
    const { queryByText, getByText } = render(
      <SnapReport snapName="Snap1" snapId="Snap1ID" />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    expect(queryByText('Success')).toBeInTheDocument();

    expect(queryByText('Report')).not.toBeInTheDocument();
    expect(queryByText('Reported')).toBeInTheDocument();
    expect(queryByText('Reported')).toBeDisabled();
  });
});
