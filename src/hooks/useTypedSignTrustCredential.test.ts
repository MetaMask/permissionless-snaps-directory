import { act } from '@testing-library/react';
import { useAccount, usePublicClient, useSignTypedData } from 'wagmi';

import { useTypedSignTrustCredential } from './useTypedSignTrustCredential';
import { renderHook } from '../utils/test-utils';
import { VALID_ACCOUNT_1 } from '../utils/test-utils/input';

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
      mockUseAccount.mockReturnValue(VALID_ACCOUNT_1);
      mockUsePublicClient.mockReturnValue({
        verifyTypedData: jest.fn().mockResolvedValue(true),
      });
      mockUseSignTypedData.mockReturnValue({
        data: 'signature',
        signTypedData: () => true,
      });

      const { result } = await act(() =>
        renderHook(() => useTypedSignTrustCredential(VALID_ACCOUNT_1)),
      );

      const { isVerified, isLoading } = result.current;

      expect(isVerified).toBe(false);
      expect(isLoading).toBe(false);
    });
  });
});
