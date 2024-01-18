import type { SignTypedDataArgs } from '@wagmi/core';
import { isAddress } from 'viem';

/**
 * Generate the message containing TrustCredential to be signed.
 *
 * @param issueAddress - The issuer address to be included in the message.
 * @param subjectAddress - The subject address to be included in the message.
 * @param chainId - The chainId to be included in the message.
 * @param isAdd - The boolean to flag whether is for add or remove.
 * @returns The message to be signed.
 */
export function generateAccountTrustMsg(
  issueAddress: string,
  subjectAddress: string,
  chainId: number,
  isAdd: boolean,
): SignTypedDataArgs {
  if (!isAddress(issueAddress)) {
    throw new Error('Invalid issueAddress');
  }

  if (!isAddress(subjectAddress)) {
    throw new Error('Invalid subjectAddress');
  }

  const domain = {
    name: 'EIP712Example',
    version: '1',
    chainId,
  };

  const types = {
    Trustworthiness: [
      {
        name: 'scope',
        type: 'string',
      },
      {
        name: 'level',
        type: 'uint8',
      },
      {
        name: 'reason',
        type: 'string[]',
      },
    ],
    CredentialSubject: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'trustworthiness',
        type: 'Trustworthiness[]',
      },
    ],

    TrustCredential: [
      {
        name: 'type',
        type: 'string[]',
      },
      {
        name: 'issuer',
        type: 'string',
      },
      {
        name: 'credentialSubject',
        type: 'CredentialSubject',
      },
    ],
  };

  const message = {
    type: ['TrustCredential'],
    issuer: `did:pkh:eip155:${chainId}:${issueAddress}`,
    credentialSubject: {
      id: `did:pkh:eip155:${chainId}:${subjectAddress}`,
      trustworthiness: [
        {
          scope: 'Honesty',
          level: isAdd ? 1 : 0,
          reason: [],
        },
      ],
    },
  };

  return { domain, message, primaryType: 'TrustCredential', types };
}
