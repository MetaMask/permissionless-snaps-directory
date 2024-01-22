import { act, waitFor } from '@testing-library/react';
import { useAccount, usePublicClient, useSignTypedData } from 'wagmi';

import { useTypedSignTrustCredential } from './useTypedSignTrustCredential';
import { renderHook } from '../utils/test-utils';
import { VALID_ACCOUNT_1, VALID_ACCOUNT_2 } from '../utils/test-utils/input';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  usePublicClient: jest.fn(),
  useSignTypedData: jest.fn(),
  useChainId: () => 1,
}));

describe('useTypedSignTrustCredetial', () => {
  let mockUseAccount: jest.Mock;
  let mockUsePublicClient: jest.Mock;
  let mockUseSignTypedData: jest.Mock;

  const normalSignFlow = async () => {
    const mockSignTypedData = jest.fn();
    mockUseSignTypedData.mockReturnValue({
      data: 'signature',
      signTypedData: mockSignTypedData,
    });
    mockSignTypedData.mockResolvedValue(true);

    const { result } = await act(() =>
      renderHook(() => useTypedSignTrustCredential()),
    );

    const { submitTypedSignRequest } = result.current;

    await waitFor(() => submitTypedSignRequest(VALID_ACCOUNT_2, true));

    return { mockSignTypedData, result };
  };

  beforeEach(() => {
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();

    mockUsePublicClient = usePublicClient as jest.Mock;
    mockUsePublicClient.mockClear();

    mockUseSignTypedData = useSignTypedData as jest.Mock;
    mockUseSignTypedData.mockClear();
  });

  describe('submitTypedSignRequest', () => {
    it('check intial state is correct', async () => {
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      mockUsePublicClient.mockReturnValue({
        verifyTypedData: jest.fn().mockResolvedValue(true),
      });

      mockUseSignTypedData.mockReturnValue({
        data: 'signature',
        signTypedData: () => true,
      });

      const { result } = await act(() =>
        renderHook(() => useTypedSignTrustCredential()),
      );

      expect(mockUseAccount).toHaveBeenCalled();
      expect(mockUsePublicClient).toHaveBeenCalled();
      expect(mockUseSignTypedData).toHaveBeenCalled();

      const { isVerified, isLoading } = result.current;

      expect(isVerified).toBe(false);
      expect(isLoading).toBe(false);
    });

    it('check submitTypedSignRequest will not be called when useAccount return undefined or empty address', async () => {
      mockUseAccount.mockReturnValue({ address: undefined });
      mockUsePublicClient.mockReturnValue({
        verifyTypedData: jest.fn().mockResolvedValue(true),
      });

      const { mockSignTypedData } = await normalSignFlow();
      expect(mockSignTypedData).not.toHaveBeenCalled();
    });

    it('check submitTypedSignRequest is called with correct arguments and verifyTypedData return true', async () => {
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      mockUsePublicClient.mockReturnValue({
        verifyTypedData: jest.fn().mockResolvedValue(Promise.resolve(true)),
      });

      const { mockSignTypedData, result } = await normalSignFlow();

      expect(mockSignTypedData).toHaveBeenCalled();
      expect(result.current.signature).toBe('signature');
    });

    it('check submitTypedSignRequest is called with correct arguments and verifyTypedData return false', async () => {
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      mockUsePublicClient.mockReturnValue({
        verifyTypedData: jest.fn().mockResolvedValue(Promise.resolve(false)),
      });

      const { mockSignTypedData, result } = await normalSignFlow();
      const { isVerified } = result.current;

      expect(mockSignTypedData).toHaveBeenCalled();
      expect(isVerified).toBe(false);
    });

    it('check submitTypedSignRequest is called with correct arguments and verifyTypedData throw error', async () => {
      mockUseAccount.mockReturnValue({ address: VALID_ACCOUNT_1 });
      mockUsePublicClient.mockReturnValue({
        verifyTypedData: jest.fn().mockRejectedValue(Promise.resolve(false)),
      });

      const { mockSignTypedData, result } = await normalSignFlow();
      const { isVerified } = result.current;

      expect(mockSignTypedData).toHaveBeenCalled();
      expect(isVerified).toBe(false);
    });
  });
});
