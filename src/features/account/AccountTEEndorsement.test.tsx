import { useToast } from '@chakra-ui/react';
import { act } from '@testing-library/react';
import { useEnsName } from 'wagmi';

import { AccountTEEndorsement } from './AccountTEEndorsement';
import type { VCSignError } from '../../hooks/useVerifiableCredential';
import {
  useVerifiableCredential,
  VCSignErrorType,
} from '../../hooks/useVerifiableCredential';
import { TrustworthinessScope, trimAddress } from '../../utils';
import {
  render,
  VALID_ACCOUNT_1,
  VALID_ACCOUNT_2,
} from '../../utils/test-utils';

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

jest.mock('../../hooks/useVerifiableCredential', () => ({
  ...jest.requireActual('../../hooks/useVerifiableCredential'),
  useVerifiableCredential: jest.fn(),
}));

describe('AccountTEEndorsement', () => {
  const buildToastSpy = () => {
    const mockUseToast = useToast as jest.Mock;
    const toastSpy = jest.fn();
    mockUseToast.mockReturnValue(toastSpy);
    return {
      toastSpy,
    };
  };

  const buildEnsNameMock = (name?: string, isLoading = false) => {
    const mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockImplementation(() => ({
      data: name,
      isLoading,
    }));
  };

  const buildUseVerifiableCredentialMock = (signError?: VCSignError) => {
    const useVerifiableCredentialMock = useVerifiableCredential as jest.Mock;

    const signMessageSpy = jest.fn();
    const buildTechnicalExpertiseTrustSpy = jest.fn();
    const getSignedAssertionSpy = jest.fn();

    useVerifiableCredentialMock.mockReturnValue({
      signMessage: signMessageSpy,
      accountVCBuilder: {
        buildTechnicalExpertiseTrust: buildTechnicalExpertiseTrustSpy,
        getSignedAssertion: getSignedAssertionSpy,
      },
      signError,
      issuerAddress: VALID_ACCOUNT_1,
    });

    return {
      signMessageSpy,
      getSignedAssertionSpy,
      buildTechnicalExpertiseTrustSpy,
    };
  };

  const runOnSign = async () => {
    const { getByText } = render(
      <AccountTEEndorsement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endorse').click();
      }),
    );

    await act(async () =>
      act(() => {
        getByText('Sign').click();
      }),
    );
  };

  it('renders', async () => {
    buildEnsNameMock('ens.mock.name');
    buildUseVerifiableCredentialMock();

    const { queryByText, getByText } = render(
      <AccountTEEndorsement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endorse').click();
      }),
    );

    expect(queryByText('Endorse')).toBeInTheDocument();
    expect(queryByText('Software Security')).toBeInTheDocument();
    expect(queryByText('Software Development')).toBeInTheDocument();
  });

  it('assigns trimed address to `trustEntity` when `useEnsName` is not ready or return null', async () => {
    buildEnsNameMock();
    buildUseVerifiableCredentialMock();

    const { queryByText, getByText } = render(
      <AccountTEEndorsement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endorse').click();
      }),
    );

    expect(queryByText(trimAddress(VALID_ACCOUNT_1))).toBeInTheDocument();
  });

  it('assigns ens name to `trustEntity` when `useEnsName` returns a name', async () => {
    buildEnsNameMock('mock.ens.name');
    buildUseVerifiableCredentialMock();

    const { queryByText, getByText } = render(
      <AccountTEEndorsement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endorse').click();
      }),
    );

    expect(queryByText('mock.ens.name')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    buildEnsNameMock('mock.ens.name');
    buildToastSpy();
    buildUseVerifiableCredentialMock();

    const { queryByText, getByLabelText, getByText } = render(
      <AccountTEEndorsement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endorse').click();
      }),
    );

    await act(async () => {
      getByLabelText('Close').click();
    });

    expect(queryByText('mock.ens.name')).not.toBeInTheDocument();
  });

  describe('when onSign is triggered', () => {
    it('calls `getSignedAssertion` when `signMessage` returns signature', async () => {
      buildEnsNameMock('mock.ens.name');
      buildToastSpy();
      const {
        signMessageSpy,
        getSignedAssertionSpy,
        buildTechnicalExpertiseTrustSpy,
      } = buildUseVerifiableCredentialMock(undefined);

      signMessageSpy.mockResolvedValue('0xSignature');

      await runOnSign();

      expect(signMessageSpy).toHaveBeenCalled();
      expect(getSignedAssertionSpy).toHaveBeenCalled();
      expect(buildTechnicalExpertiseTrustSpy).toHaveBeenCalledWith(
        VALID_ACCOUNT_2,
        VALID_ACCOUNT_1,
        [
          {
            scope: TrustworthinessScope.SoftwareDevelopment,
            level: 0,
          },
          {
            scope: TrustworthinessScope.SoftwareSecurity,
            level: 0,
          },
        ],
      );
    });

    it('does not calls `getSignedAssertion` when `signMessage` returns null', async () => {
      buildEnsNameMock('mock.ens.name');
      buildToastSpy();
      const {
        signMessageSpy,
        getSignedAssertionSpy,
        buildTechnicalExpertiseTrustSpy,
      } = buildUseVerifiableCredentialMock(undefined);

      signMessageSpy.mockResolvedValue(null);

      await runOnSign();

      expect(signMessageSpy).toHaveBeenCalled();
      expect(buildTechnicalExpertiseTrustSpy).toHaveBeenCalled();
      expect(getSignedAssertionSpy).not.toHaveBeenCalled();
    });

    it('merges selected `ExpertiseTrust` and default `ExpertiseTrust`', async () => {
      buildEnsNameMock('mock.ens.name');
      buildToastSpy();
      const {
        signMessageSpy,
        getSignedAssertionSpy,
        buildTechnicalExpertiseTrustSpy,
      } = buildUseVerifiableCredentialMock(undefined);

      signMessageSpy.mockResolvedValue('0xSignature');

      const { getByText } = render(
        <AccountTEEndorsement
          address={VALID_ACCOUNT_1}
          connectedAddress={VALID_ACCOUNT_2}
        />,
      );

      await act(async () =>
        act(() => {
          getByText('Endorse').click();
        }),
      );

      await act(async () =>
        act(() => {
          getByText('Software Development').click();
        }),
      );

      await act(async () =>
        act(() => {
          getByText('Sign').click();
        }),
      );

      expect(signMessageSpy).toHaveBeenCalled();
      expect(getSignedAssertionSpy).toHaveBeenCalled();
      expect(buildTechnicalExpertiseTrustSpy).toHaveBeenCalledWith(
        VALID_ACCOUNT_2,
        VALID_ACCOUNT_1,
        [
          {
            scope: TrustworthinessScope.SoftwareDevelopment,
            level: 1,
          },
          {
            scope: TrustworthinessScope.SoftwareSecurity,
            level: 0,
          },
        ],
      );
    });
  });

  describe('with signError', () => {
    it('shows `Failed to sign the message` toast message when signError is of type `SignError`', async () => {
      buildEnsNameMock('mock.ens.name');
      const { toastSpy } = buildToastSpy();
      buildUseVerifiableCredentialMock({
        type: VCSignErrorType.SignError,
        message: 'sign error',
      });

      await act(async () =>
        render(
          <AccountTEEndorsement
            address={VALID_ACCOUNT_1}
            connectedAddress={VALID_ACCOUNT_2}
          />,
        ),
      );

      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Failed to sign the message',
          description: 'sign error',
        }),
      );
    });

    it('shows `Failed to verify signature` toast message when signError is of type `VerifyError`', async () => {
      buildEnsNameMock('mock.ens.name');
      const { toastSpy } = buildToastSpy();
      buildUseVerifiableCredentialMock({ type: VCSignErrorType.VerifyError });

      await act(async () =>
        render(
          <AccountTEEndorsement
            address={VALID_ACCOUNT_1}
            connectedAddress={VALID_ACCOUNT_2}
          />,
        ),
      );

      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Failed to verify signature',
          description: 'Your signature is invalid',
        }),
      );
    });

    it('shows `Invalid Signature` toast message when signError is of type `SignError`', async () => {
      buildEnsNameMock('mock.ens.name');
      const { toastSpy } = buildToastSpy();
      buildUseVerifiableCredentialMock({
        type: VCSignErrorType.VerifyFailed,
        message: 'invalid signature',
      });

      await act(async () =>
        render(
          <AccountTEEndorsement
            address={VALID_ACCOUNT_1}
            connectedAddress={VALID_ACCOUNT_2}
          />,
        ),
      );

      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Invalid Signature',
          description: 'invalid signature',
        }),
      );
    });

    it('shows `Failed to sign the message` toast message when signError is unknown', async () => {
      buildEnsNameMock('mock.ens.name');
      const { toastSpy } = buildToastSpy();
      // @ts-expect-error - Invalid error.
      buildUseVerifiableCredentialMock({ type: 'unknown' });

      await act(async () =>
        render(
          <AccountTEEndorsement
            address={VALID_ACCOUNT_1}
            connectedAddress={VALID_ACCOUNT_2}
          />,
        ),
      );

      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Failed to sign the message',
          description: 'Unknown error',
        }),
      );
    });
  });
});
