import { useToast } from '@chakra-ui/react';
import { act } from '@testing-library/react';
import { useEnsName } from 'wagmi';

import { AccountReport } from './AccountReport';
import type { VCSignError } from '../../hooks/useVerifiableCredential';
import {
  useVerifiableCredential,
  VCSignErrorType,
} from '../../hooks/useVerifiableCredential';
import { trimAddress } from '../../utils';
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

describe('AccountReport', () => {
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
    const buildReportAccountTrustSpy = jest.fn();
    const getSignedAssertionSpy = jest.fn();

    useVerifiableCredentialMock.mockReturnValue({
      signMessage: signMessageSpy,
      accountVCBuilder: {
        buildReportAccountTrust: buildReportAccountTrustSpy,
        getSignedAssertion: getSignedAssertionSpy,
      },
      signError,
      issuerAddress: VALID_ACCOUNT_1,
    });

    return {
      signMessageSpy,
      getSignedAssertionSpy,
      buildReportAccountTrustSpy,
    };
  };

  const runOnSign = async () => {
    const { getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    await act(async () =>
      act(() => {
        getByText('Sign to report').click();
      }),
    );
  };

  it('renders', async () => {
    buildEnsNameMock('ens.mock.name');
    buildUseVerifiableCredentialMock();

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    expect(queryByText('Report')).toBeInTheDocument();
    expect(queryByText('Scamming')).toBeInTheDocument();
    expect(queryByText('Hacking')).toBeInTheDocument();
    expect(queryByText('Harassment')).toBeInTheDocument();
    expect(queryByText('Disinformation')).toBeInTheDocument();
    expect(queryByText('Other')).toBeInTheDocument();
  });

  it('assigns trimmed address to `reportEntity` when `useEnsName` is not ready or returns null', async () => {
    buildEnsNameMock();
    buildUseVerifiableCredentialMock();

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    expect(queryByText(trimAddress(VALID_ACCOUNT_1))).toBeInTheDocument();
  });

  it('assigns ens name to `reportEntity` when `useEnsName` returns a name', async () => {
    buildEnsNameMock('mock.ens.name');
    buildUseVerifiableCredentialMock();

    const { queryByText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    expect(queryByText('mock.ens.name')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    buildEnsNameMock('mock.ens.name');
    buildToastSpy();
    buildUseVerifiableCredentialMock();

    const { queryByText, getByLabelText, getByText } = render(
      <AccountReport
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
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
        buildReportAccountTrustSpy,
      } = buildUseVerifiableCredentialMock(undefined);

      signMessageSpy.mockResolvedValue('0xSignature');

      await runOnSign();

      expect(signMessageSpy).toHaveBeenCalled();
      expect(getSignedAssertionSpy).toHaveBeenCalled();
      expect(buildReportAccountTrustSpy).toHaveBeenCalledWith(
        VALID_ACCOUNT_2,
        VALID_ACCOUNT_1,
        [],
      );
    });

    it('calls `getSignedAssertion` with selected reasons when `signMessage` returns signature', async () => {
      buildEnsNameMock('mock.ens.name');
      buildToastSpy();
      const {
        signMessageSpy,
        getSignedAssertionSpy,
        buildReportAccountTrustSpy,
      } = buildUseVerifiableCredentialMock(undefined);

      signMessageSpy.mockResolvedValue('0xSignature');

      const { getByText } = render(
        <AccountReport
          address={VALID_ACCOUNT_1}
          connectedAddress={VALID_ACCOUNT_2}
        />,
      );

      await act(async () =>
        act(() => {
          getByText('Report').click();
        }),
      );

      await act(async () =>
        act(() => {
          getByText('Scamming').click();
          getByText('Other').click();
        }),
      );

      await act(async () =>
        act(() => {
          getByText('Sign to report').click();
        }),
      );

      expect(signMessageSpy).toHaveBeenCalled();
      expect(getSignedAssertionSpy).toHaveBeenCalled();
      expect(buildReportAccountTrustSpy).toHaveBeenCalledWith(
        VALID_ACCOUNT_2,
        VALID_ACCOUNT_1,
        ['Scamming', 'Other'],
      );
    });

    it('does not call `getSignedAssertion` when `signMessage` returns null', async () => {
      buildEnsNameMock('mock.ens.name');
      buildToastSpy();
      const {
        signMessageSpy,
        getSignedAssertionSpy,
        buildReportAccountTrustSpy,
      } = buildUseVerifiableCredentialMock(undefined);

      signMessageSpy.mockResolvedValue(null);

      await runOnSign();

      expect(signMessageSpy).toHaveBeenCalled();
      expect(buildReportAccountTrustSpy).toHaveBeenCalled();
      expect(getSignedAssertionSpy).not.toHaveBeenCalled();
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
          <AccountReport
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
          <AccountReport
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
          <AccountReport
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
          <AccountReport
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
