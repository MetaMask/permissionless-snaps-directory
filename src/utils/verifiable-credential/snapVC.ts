import type { Hex } from '@metamask/utils';

import { BaseVerifiableCredential } from './baseVC';
import {
  TrustCredentialType,
  SnapStatusReasonType,
  SnapCurrentStatus,
  type SnapDid,
  type StatusReason,
  type SnapCredentialSubject,
} from './types';

export class SnapVerifiableCredential extends BaseVerifiableCredential {
  primaryType: TrustCredentialType = TrustCredentialType.StatusCredential;

  credentialSubjectTypes = {
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

  protected getSubjectDid(versionChecksum: string): SnapDid {
    // TODO how to check verify the checksum is shasum?? they only will be same if they all use SHA algorithm
    return `snap://${versionChecksum}`;
  }

  protected getCredentialSubject(
    versionChecksum: string,
    status: SnapCurrentStatus,
    statusReason: StatusReason,
  ): SnapCredentialSubject {
    return {
      id: this.getSubjectDid(versionChecksum),
      currentStatus: status,
      statusReason,
    };
  }

  buildEndosedPayload(
    issuerAddress: Hex,
    versionChecksum: string,
    reason: string[],
  ) {
    const statusReason = {
      type: SnapStatusReasonType.Endorse,
      value: reason,
    };
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(
        versionChecksum,
        SnapCurrentStatus.Endorsed,
        statusReason,
      ),
    );
  }

  buildDisputedPayload(
    issuerAddress: Hex,
    versionChecksum: string,
    reason: string[],
  ) {
    const statusReason = {
      type: SnapStatusReasonType.Dispute,
      value: reason,
    };
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(
        versionChecksum,
        SnapCurrentStatus.Disputed,
        statusReason,
      ),
    );
  }
}
