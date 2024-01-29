import { SnapVerifiableCredential } from './snapVC';
import { VALID_ACCOUNT_1, SNAP_SHASUM_1 } from '../test-utils';

const typedDataStruct = {
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

const typedDataDomain = {
  name: 'VerifiableCredential',
  version: '1',
  chainId: 1,
};

describe('SnapVerifiableCredential', () => {
  const buildSnapVerifiableCredential = () => {
    return new SnapVerifiableCredential(1);
  };

  describe('buildEndosedPayload', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildSnapVerifiableCredential();
      expect(
        vc.buildEndosedPayload(VALID_ACCOUNT_1, SNAP_SHASUM_1, ['reason']),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'StatusCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `snap://${SNAP_SHASUM_1}`,
            currentStatus: 'Endorsed',
            statusReason: {
              type: 'Endorse',
              value: ['reason'],
            },
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });

  describe('buildDisputedPayload', () => {
    it('builds a valid verifiable credential', () => {
      const vc = buildSnapVerifiableCredential();
      expect(
        vc.buildDisputedPayload(VALID_ACCOUNT_1, SNAP_SHASUM_1, ['reason']),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'StatusCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `snap://${SNAP_SHASUM_1}`,
            currentStatus: 'Disputed',
            statusReason: {
              type: 'Dispute',
              value: ['reason'],
            },
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });
});
