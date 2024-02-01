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

  protected getSubjectDid(snapChecksum: string): SnapDid {
    return `snap://${snapChecksum}`;
  }

  protected getCredentialSubject(
    snapChecksum: string,
    status: SnapCurrentStatus,
    statusReason: StatusReason,
  ): SnapCredentialSubject {
    return {
      id: this.getSubjectDid(snapChecksum),
      currentStatus: status,
      statusReason,
    };
  }

  buildEndosedPayload(
    issuerAddress: Hex,
    snapChecksum: string,
    reason: string[],
  ) {
    const statusReason = {
      type: SnapStatusReasonType.Endorse,
      value: reason,
    };
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(
        snapChecksum,
        SnapCurrentStatus.Endorsed,
        statusReason,
      ),
    );
  }

  buildDisputedPayload(
    issuerAddress: Hex,
    snapChecksum: string,
    reason: string[],
  ) {
    const statusReason = {
      type: SnapStatusReasonType.Dispute,
      value: reason,
    };
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(
        snapChecksum,
        SnapCurrentStatus.Disputed,
        statusReason,
      ),
    );
  }
}
