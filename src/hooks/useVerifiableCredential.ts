import type { Hex } from '@metamask/utils';
import type { SignTypedDataArgs } from '@wagmi/core';
import { useCallback, useMemo, useState } from 'react';
import {
  useAccount,
  useChainId,
  usePublicClient,
  useSignTypedData,
} from 'wagmi';

import {
  AccountVerifiableCredential,
  SnapVerifiableCredential,
} from '../utils';

export enum VCSignErrorType {
  SignError = 'SignError',
  VerifyError = 'VerifyError',
  VerifyFailed = 'VerifyFailed',
}

export type VCSignError = {
  type: VCSignErrorType;
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
  const { signTypedDataAsync } = useSignTypedData();

  const [signError, setSignError] = useState<VCSignError>();

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
      try {
        if (address) {
          const signature = await signTypedDataAsync(signArg);

          if (signature) {
            try {
              const { domain, types, primaryType, message } = signArg;

              if (
                await verifyClient.verifyTypedData({
                  address,
                  domain,
                  types,
                  primaryType,
                  message,
                  signature,
                })
              ) {
                return signature;
              }

              setSignError({
                type: VCSignErrorType.VerifyFailed,
              });
            } catch (error: any) {
              setSignError({
                type: VCSignErrorType.VerifyError,
                message: error.message,
              });
            }
          }
        }
      } catch (error: any) {
        setSignError({
          type: VCSignErrorType.SignError,
          message: error.message,
        });
      }
      return null;
    },
    [address, verifyClient, signTypedDataAsync],
  );

  snapVCBuilder.buildDisputedPayload(
    address as Hex,
    'CmWnKZgn0YwhCONy9eAp6caU/4MFPO74bXReg/IlBPw=',
    [],
  );
  return {
    issuerAddress: address,
    signMessage,
    signError,
    accountVCBuilder,
    snapVCBuilder,
  };
}
