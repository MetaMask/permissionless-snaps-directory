import { SnapVerifiableCredential } from './snapVC';
import { SNAP_SHASUM_1, VALID_ACCOUNT_1 } from '../test-utils';

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
        vc.buildEndorsedPayload(VALID_ACCOUNT_1, SNAP_SHASUM_1, ['reason']),
      ).toStrictEqual({
        domain: typedDataDomain,
        message: {
          '@context': ['https://www.w3.org/2018/credentials/v2'],
          type: ['VerifiableCredential', 'ReviewCredential'],
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
          type: ['VerifiableCredential', 'ReviewCredential'],
          issuer: `did:pkh:eip155:1:${VALID_ACCOUNT_1}`,
          issuanceDate: expect.any(String),
          credentialSubject: {
            id: `snap://${SNAP_SHASUM_1}`,
            currentStatus: 'Disputed',
            statusReason: {
              type: 'Malicious',
              value: ['reason'],
            },
          },
        },
        types: typedDataStruct,
        primaryType: 'VerifiableCredential',
      });
    });
  });

  describe('getSnapIdFromDid', () => {
    it('returns address if parses DID successfully', async () => {
      const vc = buildSnapVerifiableCredential();
      expect(vc.getSnapIdFromDid(`snap://${SNAP_SHASUM_1}`)).toBe(
        SNAP_SHASUM_1,
      );
    });

    it('returns undefined if parsing DID fails', async () => {
      const vc = buildSnapVerifiableCredential();
      expect(vc.getSnapIdFromDid(`did:foo:${SNAP_SHASUM_1}`)).toBeUndefined();
    });
  });
});
