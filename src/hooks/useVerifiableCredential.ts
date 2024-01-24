import { useToast } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import type { SignTypedDataArgs } from '@wagmi/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  useChainId,
  usePublicClient,
  useSignTypedData,
} from 'wagmi';

import {
  VerifiableCredentialService,
  AccountVerifiableCredential,
  SnapVerifiableCredential,
} from '../utils';

export enum SignatureErrorTypes {
  SignError = 'SignError',
  VerifyError = 'VerifyError',
  VerifyFailed = 'VerifyFailed',
}

export type SignatureError = {
  type: SignatureErrorTypes;
  message?: string;
};

/**
 * A Hook to sign VerifiableCredential typed data.
 *
 * @returns The sign function, issuerAddress, signatureError and VerifiableCredential builders.
 */
export function useVerifiableCredential() {
  const verifyClient = usePublicClient();
  const chainId = useChainId();
  const { address } = useAccount();
  const toast = useToast({ position: 'top' });
  const { signTypedDataAsync } = useSignTypedData();

  const [signatureError, setSignatureError] = useState<SignatureError>();

  const service = useMemo(
    () => new VerifiableCredentialService(verifyClient, signTypedDataAsync),
    [verifyClient, signTypedDataAsync],
  );

  const accountVCBuilder = useMemo(
    () => new AccountVerifiableCredential(chainId),
    [chainId],
  );

  const snapVCBuilder = useMemo(
    () => new SnapVerifiableCredential(chainId),
    [chainId],
  );

  const signMessage = useCallback(
    async (signArg: SignTypedDataArgs): Promise<Hex | null> => {
      if (address) {
        try {
          const signature = await service.sign(signArg);

          if (signature) {
            try {
              const result = await service.verify(address, signArg, signature);

              if (result) {
                return signature;
              }

              setSignatureError({
                type: SignatureErrorTypes.VerifyFailed,
              });
            } catch (error: any) {
              setSignatureError({
                type: SignatureErrorTypes.VerifyError,
                message: error.message,
              });
            }
          }
        } catch (error: any) {
          setSignatureError({
            type: SignatureErrorTypes.SignError,
            message: error.message,
          });
        }
      }

      return null;
    },
    [address, service],
  );

  useEffect(() => {
    if (signatureError) {
      switch (signatureError.type) {
        case SignatureErrorTypes.VerifyFailed:
          toast({
            title: t`Failed to verify signature`,
            description: t`Your signature is invalid`,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          break;
        case SignatureErrorTypes.VerifyError:
          toast({
            title: t`Invalid Signature`,
            description: signatureError.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: t`Failed to sign the signature`,
            description: signatureError.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          break;
      }
    }
  }, [signatureError, toast]);

  return {
    issuerAddress: address,
    signMessage,
    accountVCBuilder,
    snapVCBuilder,
    signatureError,
  };
}
