export enum TrustworthinessScope {
  Honesty = 'Honesty',
  SoftwareSecurity = 'Software security',
  SoftwareDevelopment = 'Software development',
}

export enum SnapCurrentStatus {
  Endorsed = 'Endorsed',
  Disputed = 'Disputed',
}

export enum SnapStatusReasonType {
  Endorse = 'Endorse',
  Dispute = 'Dispute',
}

export enum TrustCredentialType {
  TrustCredential = 'TrustCredential',
  VerifiableCredential = 'VerifiableCredential',
  StatusCredential = 'StatusCredential',
}

export type PKHDid = `did:pkh:eip155:${string}`;

export type SnapDid = `snap://${string}`;

export type Did = PKHDid | SnapDid;

export type StatusReason = {
  type: SnapStatusReasonType;
  value: string[];
};

export type Trustworthiness = {
  scope: TrustworthinessScope;
  level: number;
  reason?: string[];
};

export type AccountCredentialSubject = {
  id: PKHDid;
  trustworthiness: Trustworthiness[];
};

export type SnapCredentialSubject = {
  id: SnapDid;
  currentStatus: SnapCurrentStatus;
  statusReason: StatusReason;
};

export type CredentialSubject =
  | AccountCredentialSubject
  | SnapCredentialSubject;

export type Assertion = {
  type: TrustCredentialType[];
  issuer: Did;
  credentialSubject: CredentialSubject;
  '@context': string[];
};

export type SignedAssertion = Assertion & {
  proof: any;
};
