import type { SignTypedDataArgs } from '@wagmi/core';
import { isAddress } from 'viem';

/**
 * Generate the TrustCredential typed data payload which will be signed by the user.
 *
 * @param issueAddress - The issuer address to be included in the message.
 * @param subjectAddress - The subject address to be included in the message.
 * @param chainId - The chainId to be included in the message.
 * @param isAdd - The boolean to flag whether is for add or remove.
 * @returns The message to be signed.
 */
export function generateTCTypedSignPayload(
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
    name: 'EIP712TrustCredential',
    version: '1',
    chainId,
  };

  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
    ],
    CredentialSchema: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'type',
        type: 'string',
      },
    ],
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
    VerifiableCredential: [
      {
        name: '@context',
        type: 'string[]',
      },
      {
        name: 'credentialSchema',
        type: 'CredentialSchema',
      },
      {
        name: 'credentialSubject',
        type: 'CredentialSubject',
      },
      {
        name: 'type',
        type: 'string[]',
      },
      {
        name: 'issuer',
        type: 'string',
      },
    ],
  };

  const message = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://beta.api.schemas.serto.id/v1/public/account-trust-credential/2.0/ld-context.json',
    ],
    type: ['VerifiableCredential', 'AccountTrustCredential'],
    credentialSchema: {
      id: 'https://beta.api.schemas.serto.id/v1/public/vetted-reviewer/1.0/json-schema.json',
      type: 'JsonSchemaValidator2018',
    },
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

  return { domain, message, primaryType: 'VerifiableCredential', types };
}
