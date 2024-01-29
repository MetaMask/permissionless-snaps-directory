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
  credentialType: TrustCredentialType = TrustCredentialType.StatusCredential;

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

  protected getSubjectDid(snapId: string): SnapDid {
    return `snap://${snapId}`;
  }

  protected getCredentialSubject(
    subjectId: string,
    status: SnapCurrentStatus,
    statusReason: StatusReason,
  ): SnapCredentialSubject {
    return {
      id: this.getSubjectDid(subjectId),
      currentStatus: status,
      statusReason,
    };
  }

  buildEndosedPayload(issuerAddress: Hex, subjectId: string, reason: string[]) {
    const statusReason = {
      type: SnapStatusReasonType.Endorse,
      value: reason,
    };
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(
        subjectId,
        SnapCurrentStatus.Endorsed,
        statusReason,
      ),
    );
  }

  buildDisputedPayload(
    issuerAddress: Hex,
    subjectId: string,
    reason: string[],
  ) {
    const statusReason = {
      type: SnapStatusReasonType.Dispute,
      value: reason,
    };
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(
        subjectId,
        SnapCurrentStatus.Disputed,
        statusReason,
      ),
    );
  }
}
