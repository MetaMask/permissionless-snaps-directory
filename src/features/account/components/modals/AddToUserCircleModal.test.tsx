import { act, fireEvent } from '@testing-library/react';

import { AddToUserCircleModal } from './AddToUserCircleModal';
import { VCSignErrorType, useVerifiableCredential } from '../../../../hooks';
import { createStore } from '../../../../store';
import { trimAddress } from '../../../../utils';
import {
  render,
  VALID_ACCOUNT_1,
  VALID_ACCOUNT_2,
} from '../../../../utils/test-utils';

jest.mock('../../../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

describe('AddToUserCircleModal', () => {
  let mockUseVerifiableCredential: jest.Mock;

  let store: any;
  beforeEach(() => {
    store = createStore({
      accountProfile: {
        addToUserModalOpen: true,
        userAccount: { userCircle: [] },
      },
    });

    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
  });

  it('renders AddToUserCircleModal component', () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: jest.fn(),
      signError: null,
    });

    const { queryByText } = render(
      <AddToUserCircleModal subjectAddress={VALID_ACCOUNT_2} />,
      store,
    );

    expect(queryByText('Sign to add')).toBeInTheDocument();
    expect(
      queryByText(
        'Lorem ipsum dolor description of what it means to add a user to your trust circle.',
      ),
    ).toBeInTheDocument();
  });

  it('sign button will do nothing if issuer address is not available', () => {
    const mockSignMessage = jest.fn();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: null,
      signMessage: mockSignMessage,
      signError: null,
    });
    const { getByText } = render(
      <AddToUserCircleModal subjectAddress={VALID_ACCOUNT_2} />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(mockSignMessage).not.toHaveBeenCalled();
  });

  it('sign button will do nothing if subject address is not available', () => {
    const mockSignMessage = jest.fn();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: mockSignMessage,
      signError: null,
    });
    const { getByText } = render(
      <AddToUserCircleModal subjectAddress="adfad" />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(mockSignMessage).not.toHaveBeenCalled();
  });

  it('show `Added to your trust circle` success message when sign message return valid signature', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: jest.fn().mockReturnValue(Promise.resolve('signature')),
      accountVCBuilder: {
        buildAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });
    const shortSubAddress = trimAddress(VALID_ACCOUNT_2);
    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress={VALID_ACCOUNT_2} />,
      store,
    );

    const signButton = getByText('Sign to add');
    await act(async () => {
      fireEvent.click(signButton);
    });

    expect(queryByText('Added to your trust circle')).toBeInTheDocument();
    expect(
      queryByText(`${shortSubAddress} has been added to your trust circle`),
    ).toBeInTheDocument();
  });

  it('show do nothing when sign message return null signature', async () => {
    const mockSignMessage = jest.fn();
    mockSignMessage.mockReturnValue(Promise.resolve(null));
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: mockSignMessage,
      accountVCBuilder: {
        buildAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: null,
    });

    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress={VALID_ACCOUNT_2} />,
      store,
    );

    const signButton = getByText('Sign to add');
    await act(async () => {
      fireEvent.click(signButton);
    });

    expect(mockSignMessage).toHaveBeenCalled();
    expect(queryByText('Added to your trust circle')).not.toBeInTheDocument();
  });

  it('show `The signature verification failed` when verify failed error detected', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: jest.fn().mockReturnValue(Promise.resolve(null)),
      accountVCBuilder: {
        buildAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: {
        type: VCSignErrorType.VerifyFailed,
      },
    });

    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress="invalidAddress" />,
      store,
    );

    const signButton = getByText('Sign to add');
    act(() => {
      fireEvent.click(signButton);
    });

    expect(queryByText('Error')).toBeInTheDocument();
    expect(
      queryByText('The signature verification failed'),
    ).toBeInTheDocument();
  });

  it('show `The signature could not be created` error when sign error detected', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: jest.fn().mockReturnValue(Promise.resolve(null)),
      accountVCBuilder: {
        buildAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: {
        type: VCSignErrorType.SignError,
      },
    });

    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress="errorAddress" />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(queryByText('Error')).toBeInTheDocument();
    expect(
      queryByText('The signature could not be created'),
    ).toBeInTheDocument();
  });

  it('show `The signature verification error` when verification error detected', async () => {
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: jest.fn().mockReturnValue(Promise.resolve(null)),
      accountVCBuilder: {
        buildAccountTrust: jest.fn().mockReturnValue('VC'),
        getSignedAssertion: jest.fn().mockReturnValue('assertion'),
      },
      signError: {
        type: VCSignErrorType.VerifyError,
      },
    });

    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress="errorAddress" />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(queryByText('Error')).toBeInTheDocument();
    expect(queryByText('The signature verification error')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const mockSignMessage = jest.fn();
    mockUseVerifiableCredential.mockReturnValue({
      issuerAddress: VALID_ACCOUNT_1,
      signMessage: mockSignMessage,
      signError: null,
    });

    const { getByLabelText } = render(
      <AddToUserCircleModal subjectAddress={VALID_ACCOUNT_2} />,
      store,
    );

    const closeButton = getByLabelText('Close');
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(store.getState().accountProfile.addToUserModalOpen).toBe(false);
  });
});
