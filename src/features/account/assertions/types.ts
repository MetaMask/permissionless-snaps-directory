/* eslint-disable @typescript-eslint/naming-convention */
import type { SubjectType, Value } from './enums';

export enum TrustworthinessScope {
  Honesty = 'Honesty',
  SoftwareSecurity = 'Software security',
  SoftwareDevelopment = 'Software development',
  DataProtection = 'Data protection',
  UserExperienceDesign = 'User experience design',
  Responsiveness = 'Responsiveness',
  UserSupport = 'User support',
}

export enum TrustCredentialType {
  TrustCredential = 'TrustCredential',
  VerifiableCredential = 'VerifiableCredential',
  StatusCredential = 'StatusCredential',
}

export type PKHDid = `did:pkh:eip155:${string}`;

export type Did = PKHDid;

export type ProofJWT = {
  type: 'JWT';
  jwt: string;
};

export type ProofEip712ProofValuePair = {
  type: string;
  value: string;
};

export type ProofEip712 = {
  type: 'EthereumEip712Signature2021';
  proofValue: string;
  eip712: {
    domain: {
      chainId: string;
      name: string;
      version: string;
    };
    types: {
      EIP712Domain: ProofEip712ProofValuePair[];
      CredentialStatus: ProofEip712ProofValuePair[];
      CredentialSubject: ProofEip712ProofValuePair[];
      Issuer: ProofEip712ProofValuePair[];
      Proof: ProofEip712ProofValuePair[];
      VerifiableCredential: ProofEip712ProofValuePair[];
    };
    primaryType: 'VerifiableCredential';
  };
};

export type Trustworthiness = {
  scope: TrustworthinessScope;
  level: number;
  reason?: string[];
};

export type AccountCredentialSubject = {
  id: PKHDid;
  trustworthiness: Trustworthiness[];
  statusReason: { type: string; value: string[] };
};

export type AccountAssertionResponse = {
  type: TrustCredentialType[];
  issuer: Did;
  credentialSubject: AccountCredentialSubject;
  proof?: ProofEip712;
  issuanceDate: Date;
};

export type AccountAssertion = {
  id: string;
  creationAt: Date;
  assertion: AccountAssertionResponse;
  issuerId: string;
  subjectId: string;
  subjectType: SubjectType;
  value: Value;
  reasons: string[];
};
