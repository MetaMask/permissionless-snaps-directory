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
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://beta.api.schemas.serto.id/v1/public/account-trust-credential/2.0/ld-context.json',
      ],
      type: ['VerifiableCredential', 'AccountTrustCredential'],
      credentialSchema: {
        id: 'https://beta.api.schemas.serto.id/v1/public/vetted-reviewer/1.0/json-schema.json',
        type: 'JsonSchemaValidator2018',
      },
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
    primaryType: 'VerifiableCredential',
    types: {
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
        {
          name: 'proof',
          type: 'Proof',
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
