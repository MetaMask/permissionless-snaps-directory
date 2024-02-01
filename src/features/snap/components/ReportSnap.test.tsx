import { act } from '@testing-library/react';

import { ReportSnap } from './ReportSnap';
import { useVerifiableCredential } from '../../../hooks';
import {
  SNAP_SHASUM_1,
  VALID_ACCOUNT_1,
  render,
} from '../../../utils/test-utils';

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

describe('ReportSnap', () => {
  let mockUseVerifiableCredential: jest.Mock;

  beforeEach(() => {
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
  });

  it('renders', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText } = render(
      <ReportSnap
        snapName="Snap1"
        versionChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('shows modal when click report button', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText, getByText } = render(
      <ReportSnap
        snapName="Snap1"
        versionChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
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
      snapVCBuilder: {
        buildDisputedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });

    mockSignMessage.mockReturnValue(null);

    const { queryByText, getByText } = render(
      <ReportSnap
        snapName="Snap1"
        versionChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();
    await act(async () => getByText('Sign to report').click());
    expect(mockSignMessage).toHaveBeenCalled();

    expect(queryByText('Report')).toBeInTheDocument();
    expect(queryByText('Reported')).not.toBeInTheDocument();
  });

  it('closes modal when click close button', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText, getByText, getByLabelText } = render(
      <ReportSnap
        snapName="Snap1"
        versionChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Sign to report')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Sign to report')).not.toBeInTheDocument();
  });

  it('displays `Success` toast when report success', async () => {
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
      <ReportSnap
        snapName="Snap1"
        versionChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    expect(queryByText('Success')).toBeInTheDocument();
  });
});
