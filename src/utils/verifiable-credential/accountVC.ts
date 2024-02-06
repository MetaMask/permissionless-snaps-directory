import type { Hex } from '@metamask/utils';

import { BaseVerifiableCredential } from './baseVC';
import {
  TrustworthinessScope,
  TrustCredentialType,
  type PKHDid,
  type Trustworthiness,
  type AccountCredentialSubject,
} from './types';

export class AccountVerifiableCredential extends BaseVerifiableCredential {
  credentialSubjectTypes = {
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
  };

  credentialType = TrustCredentialType.TrustCredential;

  protected getSubjectDid(subjectAddress: Hex): PKHDid {
    return `did:pkh:eip155:${this.chainId}:${subjectAddress}`;
  }

  protected getCredentialSubject(
    subjectAddress: Hex,
    trustworthiness: Trustworthiness[],
  ): AccountCredentialSubject {
    return {
      id: this.getSubjectDid(subjectAddress),
      trustworthiness,
    };
  }

  buildAccountTrust(issuerAddress: Hex, subjectAddress: Hex) {
    const trustworthiness = [
      {
        scope: TrustworthinessScope.Honesty,
        level: 1,
        reason: [],
      },
    ];
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(subjectAddress, trustworthiness),
    );
  }

  buildRemoveAccountTrust(issuerAddress: Hex, subjectAddress: Hex) {
    const trustworthiness = [
      {
        scope: TrustworthinessScope.Honesty,
        level: 0,
        reason: [],
      },
    ];
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(subjectAddress, trustworthiness),
    );
  }

  buildReportAccountTrust(
    issuerAddress: Hex,
    subjectAddress: Hex,
    reasons: string[],
  ) {
    const trustworthiness = [
      {
        scope: TrustworthinessScope.Honesty,
        level: -1,
        reason: reasons,
      },
    ];
    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(subjectAddress, trustworthiness),
    );
  }

  buildTechnicalExpertiseTrust(
    issuerAddress: Hex,
    subjectAddress: Hex,
    trustworthiness: Trustworthiness[],
  ) {
    const trustworthinessItems = trustworthiness.map((item) => ({
      scope: item.scope,
      level: item.level,
      reason: [],
    }));

    return this.buildSignPayload(
      issuerAddress,
      this.getCredentialSubject(subjectAddress, trustworthinessItems),
    );
  }
}
