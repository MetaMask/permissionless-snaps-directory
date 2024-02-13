/* eslint-disable @typescript-eslint/naming-convention */
// TODO: Create a common package for shared types
export enum SnapCurrentStatus {
  Endorsed = 'Endorsed',
  Disputed = 'Disputed',
}

export enum SnapStatusReasonType {
  Endorse = 'Endorse',
  Malicious = 'Malicious',
}

export type SnapDid = `snap://${string}`;

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

export type SnapCredentialSubject = {
  id: SnapDid;
  currentStatus: SnapCurrentStatus;
  statusReason: SnapStatusReason;
};

export type SnapStatusReason = {
  type: SnapStatusReasonType;
  value?: string[];
};

export type SnapAssertion = {
  id: string;
  assertion: SnapAssertionResponse;
};

export type SnapAssertionResponse = {
  issuer: string;
  type: string;
  proof?: ProofEip712;
  credentialSubject: SnapCredentialSubject;
};
