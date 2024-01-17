import { isAddress } from 'viem';

/**
 * Generate the message containing TrustCredential to be signed.
 *
 * @param issueAddress - The issuer address to be included in the message.
 * @param subjectAddress - The subject address to be included in the message.
 * @param isAdd - The boolean to flag whether is for add or remove.
 * @returns The message to be signed.
 */
export function generateAccountTrustMsg(
  issueAddress: string,
  subjectAddress: string,
  isAdd: boolean,
) {
  if (!isAddress(issueAddress)) {
    throw new Error('Invalid issueAddress');
  }

  if (!isAddress(subjectAddress)) {
    throw new Error('Invalid subjectAddress');
  }

  const messageObject = {
    type: ['TrustCredential'],
    issuer: `did:pkh:eip155:1:${issueAddress}`,
    credentialSubject: {
      id: `did:pkh:eip155:1:${subjectAddress}`,
      trustworthiness: [
        {
          scope: 'Honesty',
          level: isAdd ? 1 : 0,
        },
      ],
    },
  };
  return JSON.stringify(messageObject);
}

/**
 * Generate the message containing reportUser to be signed.
 *
 * @param issueAddress - The issuer address to be included in the message.
 * @param subjectAddress - The subject address to be included in the message.
 * @param reasons - The reasons to be included in the message.
 * @param isAdd - The boolean to flag whether is for add or remove.
 * @returns The message to be signed.
 */
export function generateReportUserTrustMsg(
  issueAddress: string,
  subjectAddress: string,
  reasons: string[],
  isAdd: boolean,
) {
  if (!isAddress(issueAddress)) {
    throw new Error('Invalid issueAddress');
  }

  if (!isAddress(subjectAddress)) {
    throw new Error('Invalid subjectAddress');
  }

  const messageObject = {
    type: ['TrustCredential'],
    issuer: `did:pkh:eip155:1:${issueAddress}`,
    credentialSubject: {
      id: `did:pkh:eip155:1:${subjectAddress}`,
      trustworthiness: [
        {
          scope: 'Honesty',
          level: isAdd ? -1 : 0,
          reason: reasons,
        },
      ],
    },
  };
  return JSON.stringify(messageObject);
}

/**
 * Generate the message containing remove report user to be signed.
 *
 * @param issueAddress - The issuer address to be included in the message.
 * @param subjectAddress - The subject address to be included in the message.
 * @returns The message to be signed.
 */
export function generateRemveReportUserMsg(
  issueAddress: string,
  subjectAddress: string,
) {
  if (!isAddress(issueAddress)) {
    throw new Error('Invalid issueAddress');
  }

  if (!isAddress(subjectAddress)) {
    throw new Error('Invalid subjectAddress');
  }

  const messageObject = {
    type: ['TrustCredential'],
    issuer: `did:pkh:eip155:1:${issueAddress}`,
    credentialSubject: {
      id: `did:pkh:eip155:1:${subjectAddress}`,
      trustworthiness: [
        {
          scope: 'RemoveReportUser',
          level: -1,
        },
      ],
    },
    proof: {},
  };
  return JSON.stringify(messageObject);
}

/**
 * Verify a signed message.
 *
 * @param address - The address to truncate.
 * @param message - The message to verify.
 * @param signature - The signature to verify.
 * @returns Whether the signature is valid.
 */
export async function verifyMesssage(
  address: string,
  message: string,
  signature: string,
) {
  if (!isAddress(address)) {
    throw new Error('Invalid address');
  }

  if (message.trim() === '') {
    throw new Error('Empty message');
  }

  if (signature.trim() === '') {
    throw new Error('Empty signature');
  }
  // TODO
  return true;
}
