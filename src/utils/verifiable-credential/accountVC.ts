import type { Hex } from '@metamask/utils';
import type { Address } from '@wagmi/core';

import { BaseVerifiableCredential } from './baseVC';
import {
  type AccountCredentialSubject,
  type PKHDid,
  TrustCredentialType,
  type Trustworthiness,
  TrustworthinessScope,
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

  getSubjectDid(subjectAddress?: Hex): PKHDid {
    return `did:pkh:eip155:${this.chainId}:${subjectAddress}`;
  }

  getAddressFromDid(did: string): Address | undefined {
    const regex = /^did:pkh:eip155:\d+:(0x[a-fA-F0-9]{40})$/u;
    const match = did.match(regex);
    return match?.[1] as Address | undefined;
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
