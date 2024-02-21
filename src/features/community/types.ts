export type AccountTrustScore = {
  subjectId: string;
  confidence?: number;
  value: number;
  trustScoreScope: TrustScoreScope;
  rank?: number;
  accuracy?: number;
  result: number;
};

export enum TrustScoreScope {
  SoftwareDevelopment = 'SoftwareDevelopment',
  SoftwareSecurity = 'SoftwareSecurity',
}
