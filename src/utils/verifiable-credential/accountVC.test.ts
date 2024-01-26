import { AccountVerifiableCredential } from './accountVC';
import { TrustworthinessScope } from './types';
import { VALID_ACCOUNT_1, VALID_ACCOUNT_2 } from '../test-utils';

describe('AccountVerifiableCredential', () => {
  const buildAccountVerifiableCredential = () => {
    return new AccountVerifiableCredential(1);
  };

  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
    ],
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
    TrustCredential: [
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
    ],
  };

  const domain = {
    name: 'EIP712TrustCredential',
    version: '1',
    chainId: 1,
  };

  describe('buildAccountTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2),
      ).toStrictEqual({
        domain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
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
        types,
        primaryType: 'TrustCredential',
      });
    });
  });

  describe('buildRemoveAccountTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildRemoveAccountTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2),
      ).toStrictEqual({
        domain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
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
        types,
        primaryType: 'TrustCredential',
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
        domain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
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
        types,
        primaryType: 'TrustCredential',
      });
    });
  });

  describe('buildTechnicalExpertiseTrust', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildAccountVerifiableCredential();
      expect(
        vc.buildTechnicalExpertiseTrust(VALID_ACCOUNT_1, VALID_ACCOUNT_2, [
          TrustworthinessScope.SoftwareDevelopment,
          TrustworthinessScope.SoftwareSecurity,
        ]),
      ).toStrictEqual({
        domain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'TrustCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
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
        types,
        primaryType: 'TrustCredential',
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
          eip712: {
            domain: signArg.domain,
            types: signArg.types,
            message: signArg.message,
            primaryType: signArg.primaryType,
            Proof: [
              {
                name: 'created',
                type: 'string',
              },
              {
                name: 'proofPurpose',
                type: 'string',
              },
              {
                name: 'type',
                type: 'string',
              },
              {
                name: 'verificationMethod',
                type: 'string',
              },
            ],
          },
        },
      });
    });
  });
});
