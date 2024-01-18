import { generateTCTypedSignPayload } from './signMessage';

const inputChainId = 1;
const issueAddress = '0x89778E5Be144cd454C28670988A9F88e32C2b0Df';
const subjectAddress = '0x7B17936E2a44C1fFef392d13e490fc8426d3329e';

const generateExpectedResult = (isAdd: boolean) => {
  return {
    domain: {
      name: 'EIP712Example',
      version: '1',
      chainId: inputChainId,
    },
    message: {
      type: ['TrustCredential'],
      issuer: `did:pkh:eip155:${inputChainId}:${issueAddress}`,
      credentialSubject: {
        id: `did:pkh:eip155:${inputChainId}:${subjectAddress}`,
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
      issueAddress,
      subjectAddress,
      inputChainId,
      true,
    );

    expect(result).toStrictEqual(expectedResultForAdd);

    const expectedResultForRemove = generateExpectedResult(false);
    const resultForRemove = generateTCTypedSignPayload(
      issueAddress,
      subjectAddress,
      inputChainId,
      false,
    );

    expect(resultForRemove).toStrictEqual(expectedResultForRemove);
  });

  it('throws an error when issueAddress is not a valid address', () => {
    expect(() =>
      generateTCTypedSignPayload(
        '0x123123123',
        subjectAddress,
        inputChainId,
        true,
      ),
    ).toThrow('Invalid issueAddress');
  });

  it('throws an error when subjectAddress is not a valid address', () => {
    expect(() =>
      generateTCTypedSignPayload(
        issueAddress,
        '0x123123123',
        inputChainId,
        true,
      ),
    ).toThrow('Invalid subjectAddress');
  });
});
