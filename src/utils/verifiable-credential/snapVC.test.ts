import { SnapVerifiableCredential } from './snapVC';

const VALID_ACCOUNT_1 = '0x1';
const SNAP = 'ALj0YMDz4JNchPJfreWErQx/GOh4FMWWy1o1rCq7sQQ=';

describe('SnapVerifiableCredential', () => {
  const buildSnapVerifiableCredential = () => {
    return new SnapVerifiableCredential(1);
  };

  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
    ],
    StatusReason: [
      {
        name: 'type',
        type: 'string',
      },
      {
        name: 'value',
        type: 'string[]',
      },
    ],
    CredentialSubject: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'currentStatus',
        type: 'string',
      },
      {
        name: 'statusReason',
        type: 'StatusReason',
      },
    ],
    StatusCredential: [
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

  describe('buildEndosedPayload', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildSnapVerifiableCredential();
      expect(
        vc.buildEndosedPayload(VALID_ACCOUNT_1, SNAP, ['reason']),
      ).toStrictEqual({
        domain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'StatusCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          credentialSubject: {
            id: `snap://${SNAP}`,
            currentStatus: 'Endorsed',
            statusReason: {
              type: 'Endorse',
              value: ['reason'],
            },
          },
        },
        types,
        primaryType: 'StatusCredential',
      });
    });
  });

  describe('buildDisputedPayload', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildSnapVerifiableCredential();
      expect(
        vc.buildDisputedPayload(VALID_ACCOUNT_1, SNAP, ['reason']),
      ).toStrictEqual({
        domain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'StatusCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          credentialSubject: {
            id: `snap://${SNAP}`,
            currentStatus: 'Disputed',
            statusReason: {
              type: 'Dispute',
              value: ['reason'],
            },
          },
        },
        types,
        primaryType: 'StatusCredential',
      });
    });
  });
});
