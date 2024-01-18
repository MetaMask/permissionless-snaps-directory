import { fireEvent } from '@testing-library/react';
import { createPublicClient, http } from 'viem';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';

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
    useTypedSignTrustCredetial: () => {
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

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
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
    const { getByText } = render(
      <WagmiConfig config={config}>
        <AddToUserCircleModal subjectAddress="passAddress" />,
      </WagmiConfig>,
      store,
    );

    expect(getByText('Sign to add')).toBeInTheDocument();
    expect(
      getByText(
        'Lorem ipsum dolor description of what it means to add a user to your trust circle.',
      ),
    ).toBeInTheDocument();
  });

  it('signature verification succeeds', async () => {
    const { getByText } = render(
      <WagmiConfig config={config}>
        <AddToUserCircleModal subjectAddress="passAddress" />,
      </WagmiConfig>,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(getByText('Added to your trust circle')).toBeInTheDocument();
    expect(
      getByText('passAddress has been added to your trust circle'),
    ).toBeInTheDocument();
  });

  it('signature verification fails for invalid user', async () => {
    const { getByText } = render(
      <WagmiConfig config={config}>
        <AddToUserCircleModal subjectAddress="invalidAddress" />,
      </WagmiConfig>,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(getByText('Invalid Signature')).toBeInTheDocument();
    expect(getByText('Your signature is invalid')).toBeInTheDocument();
  });

  it('signature verification fails for error', async () => {
    const { getByText } = render(
      <WagmiConfig config={config}>
        <AddToUserCircleModal subjectAddress="errorAddress" />,
      </WagmiConfig>,
      store,
    );

    const signButton = getByText('Sign to add');
    fireEvent.click(signButton);

    expect(getByText('Failed to verify signature')).toBeInTheDocument();
    expect(getByText('failed message')).toBeInTheDocument();
  });
});
