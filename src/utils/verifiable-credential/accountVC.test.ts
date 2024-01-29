import { AccountVerifiableCredential } from './accountVC';
import { TrustworthinessScope } from './types';
import { VALID_ACCOUNT_1, VALID_ACCOUNT_2 } from '../test-utils';

const typedDataStruct = {
  Trustworthiness: [
    {
      name: 'scope',
      type: 'string',
    },
    {
      name: 'level',
      type: 'int8',
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
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
  ],
  VerifiableCredential: [
    {
      name: '@context',
      type: 'string[]',
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
      name: 'credentialSubject',
      type: 'CredentialSubject',
    },
    {
      name: 'issuanceDate',
      type: 'string',
    },
  ],
};

const typedDataSignedStruct = {
  ...typedDataStruct,
  VerifiableCredential: [
    ...typedDataStruct.VerifiableCredential,
    {
      name: 'proof',
      type: 'Proof',
    },
  ],
  Proof: [
    { name: 'created', type: 'string' },
    { name: 'proofPurpose', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'verificationMethod', type: 'string' },
  ],
};

const typedDataDomain = {
  name: 'VerifiableCredential',
  version: '1',
  chainId: 1,
};

describe('AccountVerifiableCredential', () => {
  const buildAccountVerifiableCredential = () => {
    return new AccountVerifiableCredential(1);
  };

  describe('buildAccountTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `did:pkh:eip155:1:${VALID_ACCOUNT_2}`,
            trustworthiness: [
              {
                scope: 'Honesty',
                level: 1,
                reason: [],
              },
            ],
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });

  describe('buildRemoveAccountTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildRemoveAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `did:pkh:eip155:1:${VALID_ACCOUNT_2}`,
            trustworthiness: [
              {
                scope: 'Honesty',
                level: 0,
                reason: [],
              },
            ],
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });

  describe('buildReportAccountTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildReportAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2, [
          'reason',
        ]),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `did:pkh:eip155:1:${VALID_ACCOUNT_2}`,
            trustworthiness: [
              {
                scope: 'Honesty',
                level: -1,
                reason: ['reason'],
              },
            ],
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });

  describe('buildTechnicalExpertiseTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildTechnicalExpertiseTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2, [
          {
            scope: TrustworthinessScope.SoftwareDevelopment,
            level: 1,
          },
          {
            scope: TrustworthinessScope.SoftwareSecurity,
            level: 1,
          },
        ]),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `did:pkh:eip155:1:${VALID_ACCOUNT_2}`,
            trustworthiness: [
              {
                scope: 'Software development',
                level: 1,
                reason: [],
              },
              {
                scope: 'Software security',
                level: 1,
                reason: [],
              },
            ],
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });

  describe('getSignedAssertion', () => {
    it('builds a valid assertion with proof', () => {
      const vc = buildAccountVerifiableCredential();

      const signArg = vc.buildAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2);
      expect(vc.getSignedAssertion(signArg, '0xsignature')).toStrictEqual({
        '@context': ['https://www.w3.org/2018/credentials/v2'],
        type: ['VerifiableCredential', 'TrustCredential'],
        issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
        issuanceDate: expect.any(String),
        credentialSubject: {
          id: `did:pkh:eip155:1:${VALID_ACCOUNT_2}`,
          trustworthiness: [
            {
              scope: 'Honesty',
              level: 1,
              reason: [],
            },
          ],
        },
        proof: {
          type: 'EthereumEip712Signature2021',
          proofValue: '0xsignature',
          proofPurpose: 'assertionMethod',
          verificationMethod: `did:pkh:eip155:1:${VALID_ACCOUNT_1}#blockchainAccountId`,
          created: expect.any(String),
          eip712: {
            domain: signArg.domain,
            types: typedDataSignedStruct,
            primaryType: signArg.primaryType,
          },
        },
      });
    });
  });
});
