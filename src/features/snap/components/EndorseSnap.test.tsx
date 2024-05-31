import { act } from '@testing-library/react';

import { EndorseSnap } from './EndorseSnap';
import {
  useDispatch,
  useSelector,
  useVerifiableCredential,
} from '../../../hooks';
import { render, VALID_ACCOUNT_1 } from '../../../utils/test-utils';

jest.mock('../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('../../../hooks');
jest.mock('../assertions/api');

describe('EndorseSnap', () => {
  let mockUseVerifiableCredential: jest.Mock;
  let mockUseDispatch: jest.Mock;
  let mockUseSelector: jest.Mock;

  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
    mockUseSelector.mockReturnValueOnce(null);
    mockUseSelector.mockReturnValueOnce(false);
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: 'issuerAddress',
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      snapVCBuilder: {
        buildEndorsedPayload: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
        getIssuerDid: jest.fn().mockReturnValue(VALID_ACCOUNT_1),
      },
      signError: null,
    });
  });

  it('renders', async () => {
    const { queryByText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapChecksum="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    expect(queryByText('Endorse')).toBeInTheDocument();
  });

  it('shows modal when endorse button is clicked', async () => {
    const { queryByText, getByText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapChecksum="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Endorse').click());

    expect(queryByText('Attest your endorsement')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const { queryByText, getByText, getByLabelText } = render(
      <EndorseSnap
        snapName="Snap1"
        snapChecksum="Snap1ID"
        address={VALID_ACCOUNT_1}
      />,
    );

    await act(async () => getByText('Endorse').click());

    expect(queryByText('Attest your endorsement')).toBeInTheDocument();

    await act(async () => getByLabelText('Close').click());

    expect(queryByText('Attest your endorsement')).not.toBeInTheDocument();
  });
});
