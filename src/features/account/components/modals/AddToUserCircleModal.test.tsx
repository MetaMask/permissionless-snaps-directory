import { act, fireEvent } from '@testing-library/react';

import { AddToUserCircleModal } from './AddToUserCircleModal';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';

jest.mock('../../../../hooks/useTypedSignTrustCredential', () => {
  const React = jest.requireActual('react');
  const originalModule = jest.requireActual(
    '../../../../hooks/useTypedSignTrustCredential',
  );

  return {
    ...originalModule,
    useTypedSignTrustCredential: () => {
      const [isVerified, setIsVerified] = React.useState(false);
      const [signatureError, setSignatureError] = React.useState();

      const submitTypedSignRequest = async (
        subjectAddress: string,
        isAdd: boolean,
      ) => {
        switch (subjectAddress) {
          case 'passAddress':
            if (isAdd) {
              setIsVerified(true);
            }
            break;
          case 'invalidAddress':
            setIsVerified(false);
            setSignatureError({
              type: 'invalid',
              message: 'failed message',
            });
            break;
          case 'errorAddress':
            setIsVerified(false);
            setSignatureError({
              type: 'error',
              message: 'failed message',
            });
            break;
          default:
            break;
        }
      };

      return {
        submitTypedSignRequest,
        isLoading: false,
        isVerified,
        payload: {},
        signatureError,
      };
    },
  };
});

describe('AddToUserCircleModal', () => {
  let store: any;
  beforeEach(() => {
    store = createStore({
      accountProfile: {
        addToUserModalOpen: true,
        userAccount: { userCircle: [] },
      },
    });
  });
  it('renders AddToUserCircleModal component', () => {
    const { queryByText } = render(
      <AddToUserCircleModal subjectAddress="passAddress" />,
      store,
    );

    expect(queryByText('Sign to add')).toBeInTheDocument();
    expect(
      queryByText(
        'Lorem ipsum dolor description of what it means to add a user to your trust circle.',
      ),
    ).toBeInTheDocument();
  });

  it('signature verification succeeds', async () => {
    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress="passAddress" />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(queryByText('Added to your trust circle')).toBeInTheDocument();
    expect(
      queryByText('passAddress has been added to your trust circle'),
    ).toBeInTheDocument();
  });

  it('signature verification fails for invalid user', async () => {
    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress="invalidAddress" />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(queryByText('Invalid Signature')).toBeInTheDocument();
    expect(queryByText('Your signature is invalid')).toBeInTheDocument();
  });

  it('signature verification fails for error', async () => {
    const { getByText, queryByText } = render(
      <AddToUserCircleModal subjectAddress="errorAddress" />,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(queryByText('Failed to verify signature')).toBeInTheDocument();
    expect(queryByText('failed message')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    const { getByLabelText } = render(
      <AddToUserCircleModal subjectAddress="passAddress" />,
      store,
    );

    const closeButton = getByLabelText('Close');
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(store.getState().accountProfile.addToUserModalOpen).toBe(false);
  });
});
