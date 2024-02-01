import { act } from '@testing-library/react';

import { EndorseSnap } from './EndorseSnap';
import { useVerifiableCredential } from '../../../hooks';
import { VALID_ACCOUNT_1, render } from '../../../utils/test-utils';

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

describe('EndorseSnap', () => {
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
      <EndorseSnap
        snapName="Snap1"
        snapId="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    expect(queryByText('Endorse')).toBeInTheDocument();
  });

  it('shows modal when endorse button is clicked', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText, getByText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapId="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Endorse').click());

    expect(queryByText('Sign to endorse')).toBeInTheDocument();
  });

  it('does not sign when signature is null', async () => {
    const mockSignMessage = jest.fn();

    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: mockSignMessage,
      snapVCBuilder: {
        buildEndorsedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });

    mockSignMessage.mockReturnValue(null);

    const { queryByText, getByText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapId="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Endorse').click());

    expect(queryByText('Sign to endorse')).toBeInTheDocument();
    await act(async () => getByText('Sign to endorse').click());
    expect(mockSignMessage).toHaveBeenCalled();

    expect(queryByText('Endorse')).toBeInTheDocument();
    expect(queryByText('Endorsed')).not.toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn(),
      signError: null,
    });
    const { queryByText, getByText, getByLabelText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapId="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Endorse').click());

    expect(queryByText('Sign to endorse')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Sign to endorse')).not.toBeInTheDocument();
  });

  it('displays `Success` toast when endorsement is successful', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      snapVCBuilder: {
        buildEndorsedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });

    const { queryByText, getByText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapId="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Endorse').click());
    await act(async () => getByText('Sign to endorse').click());

    expect(queryByText('Success')).toBeInTheDocument();
  });
});
