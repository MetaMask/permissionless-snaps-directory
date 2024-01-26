import { act } from 'react-dom/test-utils';
import { getAddress } from 'viem';
import { useAccount, usePublicClient, useSignTypedData } from 'wagmi';

import { useVerifiableCredential } from './useVerifiableCredential';
import {
  AccountVerifiableCredential,
  SnapVerifiableCredential,
} from '../utils';
import { renderHook } from '../utils/test-utils';

jest.mock('viem', () => ({
  getAddress: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  usePublicClient: jest.fn(),
  useSignTypedData: jest.fn(),
  useChainId: () => 1,
}));

const VALID_ACCOUNT_1 = '0x1';
const VALID_ACCOUNT_2 = '0x1';

describe('useVerifiableCredential', () => {
  const buildMock = () => {
    const mockGetAddress = getAddress as jest.Mock;
    const mockUseAccount = useAccount as jest.Mock;
    const mockUsePublicClient = usePublicClient as jest.Mock;
    const mockUseSignTypedData = useSignTypedData as jest.Mock;

    const verifyTypedDataSpy = jest.fn();
    const signTypedDataAsyncSpy = jest.fn();

    mockUsePublicClient.mockReturnValue({
      verifyTypedData: verifyTypedDataSpy,
    });

    mockUseSignTypedData.mockReturnValue({
      signTypedDataAsync: signTypedDataAsyncSpy,
    });

    return {
      signTypedDataAsyncSpy,
      verifyTypedDataSpy,
      mockGetAddress,
      mockUseAccount,
    };
  };

  const runSignMessage = async () => {
    const { result } = await act(() =>
      renderHook(() => useVerifiableCredential()),
    );

    const vc = result.current.accountVCBuilder.buildAccountTrust(
      VALID_ACCOUNT_1,
      VALID_ACCOUNT_2,
    );
    const signResult = await act(async () => result.current.signMessage(vc));

    return {
      signResult,
      hookState: result.current,
    };
  };
  it('returns correct properties', async () => {
    const { mockUseAccount } = buildMock();
    mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });

    const { result } = await act(() =>
      renderHook(() => useVerifiableCredential()),
    );

    expect(result.current.issuerAddress).toBe(VALID_ACCOUNT_1);
    expect(
      result.current.accountVCBuilder instanceof AccountVerifiableCredential,
    ).toBe(true);
    expect(
      result.current.snapVCBuilder instanceof SnapVerifiableCredential,
    ).toBe(true);
    expect(typeof result.current.signMessage === 'function').toBe(true);
    expect(result.current.signError).toBeUndefined();
  });

  describe('signMessage', () => {
    it('signs and verify message if address is not empty', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, verifyTypedDataSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockResolvedValue(true);

      const { signResult } = await runSignMessage();

      expect(signTypedDataAsyncSpy).toHaveBeenCalled();
      expect(verifyTypedDataSpy).toHaveBeenCalled();
      expect(signResult).toBe('0xSignature');
    });

    it('does not sign and verify message if address is empty', async () => {
      const { mockUseAccount, verifyTypedDataSpy, signTypedDataAsyncSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: null });

      const { signResult } = await runSignMessage();

      expect(signTypedDataAsyncSpy).not.toHaveBeenCalled();
      expect(verifyTypedDataSpy).not.toHaveBeenCalled();
      expect(signResult).toBeNull();
    });

    it('does not trigger verify if signature is null', async () => {
      const { mockUseAccount, verifyTypedDataSpy, signTypedDataAsyncSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue(null);

      const { signResult } = await runSignMessage();

      expect(signTypedDataAsyncSpy).toHaveBeenCalled();
      expect(verifyTypedDataSpy).not.toHaveBeenCalled();
      expect(signResult).toBeNull();
    });

    it('return false if verify is failed', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, verifyTypedDataSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockResolvedValue(false);

      const { signResult } = await runSignMessage();

      expect(signResult).toBeNull();
    });

    it('set signError to `SignError` when sign exception catch', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy } = buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockRejectedValue(new Error('sign error'));

      const { signResult, hookState } = await runSignMessage();

      expect(signResult).toBeNull();
      expect(hookState.signError).toStrictEqual({
        type: 'SignError',
        message: 'sign error',
      });
    });

    it('set signError to `VerifyError` when verify exception catch', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, verifyTypedDataSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockRejectedValue(new Error('verify error'));

      const { signResult, hookState } = await runSignMessage();

      expect(signResult).toBeNull();
      expect(hookState.signError).toStrictEqual({
        message: 'verify error',
        type: 'VerifyError',
      });
    });

    it('set signError to `VerifyFailed` when verify failed', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, verifyTypedDataSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockResolvedValue(false);

      const { signResult, hookState } = await runSignMessage();

      expect(signResult).toBeNull();
      expect(hookState.signError).toStrictEqual({
        type: 'VerifyFailed',
      });
    });

    it('return null when user rejected to sign the message', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy } = buildMock();

      class MockMetaMaskRejectedError extends Error {
        code: number;

        constructor(message: string) {
          super(message);
          this.code = 4001;
          this.name = 'MetaMaskRejectedError';
        }
      }

      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockRejectedValue(
        new MockMetaMaskRejectedError('rejected'),
      );

      const { signResult, hookState } = await runSignMessage();

      expect(signResult).toBeNull();
      expect(hookState.signError).toBeUndefined();
    });
  });
});
