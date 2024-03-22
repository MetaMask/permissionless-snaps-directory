import type { Hex } from '@metamask/utils';

import { BaseVerifiableCredential } from './baseVC';
import {
  type SnapCredentialSubject,
  SnapCurrentStatus,
  type SnapDid,
  SnapStatusReasonType,
  type StatusReason,
  TrustCredentialType,
} from './types';

export class SnapVerifiableCredential extends BaseVerifiableCredential {
  credentialType: TrustCredentialType = TrustCredentialType.ReviewCredential;

  credentialSubjectTypes = {
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
  };

  protected getSubjectDid(snapChecksum: string): SnapDid {
    return `snap://${snapChecksum}`;
  }

  getSnapIdFromDid(did: string): string | undefined {
    const regex = /^snap:\/\/(.+)$/u;
    const match = did.match(regex);
    return match?.[1];
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

  buildEndorsedPayload(
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
      type: SnapStatusReasonType.Malicious,
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
