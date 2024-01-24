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

  protected getSubjectDid(subjectAddress: string): SnapDid {
    return `snap://${subjectAddress}`;
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
