import { generateTCTypedSignPayload } from './signMessage';
import {
  INVALID_ADDRESS,
  VALID_ACCOUNT_1,
  VALID_ACCOUNT_2,
} from './test-utils/input';

const inputChainId = 1;

const generateExpectedResult = (isAdd: boolean) => {
  return {
    domain: {
      name: 'EIP712TrustCredential',
      version: '1',
      chainId: inputChainId,
    },
    message: {
      type: ['TrustCredential'],
      issuer: `did:pkh:eip155:${inputChainId}:${VALID_ACCOUNT_1}`,
      credentialSubject: {
        id: `did:pkh:eip155:${inputChainId}:${VALID_ACCOUNT_2}`,
        trustworthiness: [
          {
            scope: 'Honesty',
            level: isAdd ? 1 : 0,
            reason: [],
          },
        ],
      },
    },
    primaryType: 'TrustCredential',
    types: {
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
    },
  };
};

describe('generateTCTypedSignPayload', () => {
  it('generates a valid trust credential typed sign payload when all argument is valid', () => {
    const expectedResultForAdd = generateExpectedResult(true);
    const result = generateTCTypedSignPayload(
      VALID_ACCOUNT_1,
      VALID_ACCOUNT_2,
      inputChainId,
      true,
    );

    expect(result).toStrictEqual(expectedResultForAdd);

    const expectedResultForRemove = generateExpectedResult(false);
    const resultForRemove = generateTCTypedSignPayload(
      VALID_ACCOUNT_1,
      VALID_ACCOUNT_2,
      inputChainId,
      false,
    );

    expect(resultForRemove).toStrictEqual(expectedResultForRemove);
  });

  it('throws an error when issueAddress is not a valid address', () => {
    expect(() =>
      generateTCTypedSignPayload(
        INVALID_ADDRESS,
        VALID_ACCOUNT_2,
        inputChainId,
        true,
      ),
    ).toThrow('Invalid issueAddress');
  });

  it('throws an error when subjectAddress is not a valid address', () => {
    expect(() =>
      generateTCTypedSignPayload(
        VALID_ACCOUNT_1,
        INVALID_ADDRESS,
        inputChainId,
        true,
      ),
    ).toThrow('Invalid subjectAddress');
  });
});
