import { act } from '@testing-library/react';

import { ReportSnap } from './ReportSnap';
import { useDispatch, useVerifiableCredential } from '../../../hooks';
import {
  render,
  SNAP_SHASUM_1,
  VALID_ACCOUNT_1,
} from '../../../utils/test-utils';

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('../../../hooks');
jest.mock('../assertions/api');

describe('ReportSnap', () => {
  let mockUseVerifiableCredential: jest.Mock;
  let mockUseDispatch: jest.Mock;

  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      snapVCBuilder: {
        buildDisputedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
        getIssuerDid: jest.fn().mockReturnValue(VALID_ACCOUNT_1),
      },
      signError: null,
    });
  });

  it('renders', async () => {
    const { queryByText } = render(
      <ReportSnap
        snapName="Snap1"
        snapChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    expect(queryByText('Report')).toBeInTheDocument();
  });

  it('shows modal when report button is clicked', async () => {
    const { queryByText, getByText } = render(
      <ReportSnap
        snapName="Snap1"
        snapChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Attest your report')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const { queryByText, getByText, getByLabelText } = render(
      <ReportSnap
        snapName="Snap1"
        snapChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());

    expect(queryByText('Attest your report')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Attest your report')).not.toBeInTheDocument();
  });
});
