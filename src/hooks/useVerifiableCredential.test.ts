import { useToast } from '@chakra-ui/react';
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

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

const VALID_ACCOUNT_1 = '0x1';
const VALID_ACCOUNT_2 = '0x1';

describe('useVerifiableCredential', () => {
  const buildMock = () => {
    const mockGetAddress = getAddress as jest.Mock;
    const mockUseAccount = useAccount as jest.Mock;
    const mockUsePublicClient = usePublicClient as jest.Mock;
    const mockUseSignTypedData = useSignTypedData as jest.Mock;
    const mockUseToast = useToast as jest.Mock;

    const verifyTypedDataSpy = jest.fn();
    const signTypedDataAsyncSpy = jest.fn();
    const toastSpy = jest.fn();

    mockUsePublicClient.mockReturnValue({
      verifyTypedData: verifyTypedDataSpy,
    });

    mockUseSignTypedData.mockReturnValue({
      signTypedDataAsync: signTypedDataAsyncSpy,
    });

    mockUseToast.mockReturnValue(toastSpy);

    return {
      signTypedDataAsyncSpy,
      verifyTypedDataSpy,
      toastSpy,
      mockGetAddress,
      mockUseAccount,
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
    expect(result.current.signatureError).toBeUndefined();
  });

  describe('signMessage', () => {
    it('signs and verify message if address is not empty', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, verifyTypedDataSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockResolvedValue(true);

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signTypedDataAsyncSpy).toHaveBeenCalled();
      expect(verifyTypedDataSpy).toHaveBeenCalled();
      expect(signResult).toBe('0xSignature');
    });

    it('does not sign and verify message if address is empty', async () => {
      const { mockUseAccount, verifyTypedDataSpy, signTypedDataAsyncSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: null });

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signTypedDataAsyncSpy).not.toHaveBeenCalled();
      expect(verifyTypedDataSpy).not.toHaveBeenCalled();
      expect(signResult).toBeNull();
    });

    it('does not trigger verify if signature is null', async () => {
      const { mockUseAccount, verifyTypedDataSpy, signTypedDataAsyncSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue(null);

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signTypedDataAsyncSpy).toHaveBeenCalled();
      expect(verifyTypedDataSpy).not.toHaveBeenCalled();
      expect(signResult).toBeNull();
    });

    it('return false if verify is fail', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, verifyTypedDataSpy } =
        buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockResolvedValue(false);

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signResult).toBeNull();
    });

    it('display toast error when sign error', async () => {
      const { mockUseAccount, signTypedDataAsyncSpy, toastSpy } = buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockRejectedValue(new Error('sign error'));

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signResult).toBeNull();
      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'sign error',
        }),
      );
    });

    it('display toast error when verify fail', async () => {
      const {
        mockUseAccount,
        signTypedDataAsyncSpy,
        verifyTypedDataSpy,
        toastSpy,
      } = buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockRejectedValue(new Error('verify error'));

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signResult).toBeNull();
      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'verify error',
        }),
      );
    });

    it('display toast error when verify false', async () => {
      const {
        mockUseAccount,
        signTypedDataAsyncSpy,
        verifyTypedDataSpy,
        toastSpy,
      } = buildMock();
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      signTypedDataAsyncSpy.mockResolvedValue('0xSignature');
      verifyTypedDataSpy.mockResolvedValue(false);

      const { result } = await act(() =>
        renderHook(() => useVerifiableCredential()),
      );

      const vc = result.current.accountVCBuilder.buildAccountTrust(
        VALID_ACCOUNT_1,
        VALID_ACCOUNT_2,
      );
      const signResult = await act(async () => result.current.signMessage(vc));

      expect(signResult).toBeNull();
      expect(toastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Your signature is invalid',
        }),
      );
    });
  });
});
