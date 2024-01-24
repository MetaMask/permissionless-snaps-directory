import type { PublicClient } from 'wagmi';

import { AccountVerifiableCredential } from './accountVC';
import { VerifiableCredentialService } from './service';

const VALID_ACCOUNT_1 = '0x1';

describe('VerifiableCredentialService', () => {
  const buildService = () => {
    const verifyTypedDataSpy = jest.fn();
    const mockClient = {
      verifyTypedData: verifyTypedDataSpy,
    } as unknown as PublicClient;

    const signUtilSpy = jest.fn();
    return {
      vcBuilder: new AccountVerifiableCredential(1),
      service: new VerifiableCredentialService(mockClient, signUtilSpy),
      verifyTypedDataSpy,
      signUtilSpy,
    };
  };

  describe('sign', () => {
    it('signs a message', async () => {
      const { service, vcBuilder, signUtilSpy } = buildService();
      signUtilSpy.mockResolvedValue('0xsignature');

      const vc = vcBuilder.buildAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_1);
      const result = await service.sign(vc);

      expect(result).toBe('0xsignature');
      expect(signUtilSpy).toHaveBeenCalled();
    });
  });

  describe('verify', () => {
    it('verifys a message', async () => {
      const { service, vcBuilder, verifyTypedDataSpy } = buildService();
      verifyTypedDataSpy.mockResolvedValue(true);

      const vc = vcBuilder.buildAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_1);
      const result = await service.verify(VALID_ACCOUNT_1, vc, '0xsignature');

      expect(result).toBe(true);
      expect(verifyTypedDataSpy).toHaveBeenCalled();
    });
  });
});
