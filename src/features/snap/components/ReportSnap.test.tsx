import { act, waitFor } from '@testing-library/react';

import { ReportSnap } from './ReportSnap';
import { useVerifiableCredential, useDispatch } from '../../../hooks';
import {
  SNAP_SHASUM_1,
  VALID_ACCOUNT_1,
  render,
} from '../../../utils/test-utils';
import {
  createSnapAssertion,
  fetchSnapAssertionsForSnapId,
} from '../assertions/api';

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
        snapChecksum={SNAP_SHASUM_1}
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

  it('closes modal when close button is clicked', async () => {
    const { queryByText, getByText, getByLabelText } = render(
      <ReportSnap
        snapName="Snap1"
        snapChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
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
      <ReportSnap
        snapName="Snap1"
        snapChecksum={SNAP_SHASUM_1}
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Success')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(
        createSnapAssertion(expect.anything()),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchSnapAssertionsForSnapId(expect.anything()),
      );
    });
  });

  it('displays `Success` toast when report is successful even when fetchSnapAssertionsForSnapId fails', async () => {
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
      <ReportSnap
        snapName="Snap1"
        snapChecksum="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Success')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(
        createSnapAssertion(expect.anything()),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        fetchSnapAssertionsForSnapId(expect.anything()),
      );
    });
  });

  it('displays error message when createSnapAssertion is rejected', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'rejected',
      }),
    );

    const { queryByText, getByText } = render(
      <ReportSnap
        snapName="Snap1"
        snapChecksum="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Error')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        createSnapAssertion(expect.anything()),
      );
    });
  });

  it('displays error message when createSnapAssertion throws execption', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );

    const { queryByText, getByText } = render(
      <ReportSnap
        snapName="Snap1"
        snapChecksum="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Report').click());
    await act(async () => getByText('Sign to report').click());

    // Wait for async actions to complete
    await waitFor(() => {
      expect(queryByText('Error')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        createSnapAssertion(expect.anything()),
      );
    });
  });
});
