import type { SignTypedDataArgs } from '@wagmi/core';
import { useCallback, useEffect, useState } from 'react';
import { useChainId, usePublicClient, useSignTypedData } from 'wagmi';

import { generateTCTypedSignPayload } from '../utils';

export enum SignatureErrorTypes {
  Invalid = 'invalid',
  Error = 'error',
}

export type SignatureError = {
  type: SignatureErrorTypes;
  message: string;
};

/**
 * A Hook to sign TrustCredential typed data.
 *
 * @param address - The address to be included in the message.
 * @returns The signature and the function to sign the message. isLoading and isVerified are used to indicate the status of the signature.
 */
export function useTypedSignTrustCredential(
  address: `0x${string}` | undefined,
) {
  const client = usePublicClient();
  const chainId = useChainId();
  const { data: signature, signTypedData } = useSignTypedData();

  const [trustCredentialTypedData, setTrustCredentialTypedData] =
    useState<SignTypedDataArgs>();
  // above useSignTypedData have isLoading, but for some reason, it is not working well with loading state, use following instead
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // Type [key_4: string] is defined inside the  SignTypedDataArgs in Wagmi
  const [payload, setPayload] = useState<{ [key_4: string]: unknown }>();
  const [signatureError, setSignatureError] = useState<SignatureError>();

  const submitTypedSignRequest = useCallback(
    (subjectAddress: string, isAdd: boolean) => {
      if (!address) {
        return;
      }
      setIsLoading(true);
      const tcTypedSignData = generateTCTypedSignPayload(
        address,
        subjectAddress,
        chainId,
        isAdd,
      );
      signTypedData(tcTypedSignData);
      setTrustCredentialTypedData(tcTypedSignData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address],
  );

  useEffect(() => {
    if (
      address &&
      trustCredentialTypedData !== undefined &&
      signature !== undefined
    ) {
      const { domain, types, primaryType, message } = trustCredentialTypedData;

      client
        .verifyTypedData({
          address,
          domain,
          types,
          primaryType,
          message,
          signature,
        })
        .then((res) => {
          if (res) {
            setIsLoading(false);
            if (res) {
              setIsVerified(true);
            }
            const tcPayload = trustCredentialTypedData.message;
            tcPayload.proof = {
              type: 'EthereumEip712Signature2021',
              proofValue: signature,
            };
            setPayload(tcPayload);
          } else {
            setSignatureError({
              type: SignatureErrorTypes.Invalid,
              message: 'Invalid signature',
            });
            setIsVerified(false);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setSignatureError({
            type: SignatureErrorTypes.Error,
            message: error.message,
          });
          setIsVerified(false);
          setIsLoading(false);
        });
    }
  }, [address, trustCredentialTypedData, signature, client]);

  return {
    isLoading,
    isVerified,
    payload,
    submitTypedSignRequest,
    signatureError,
  };
}
