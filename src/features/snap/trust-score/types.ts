// TODO: Create a common package for shared types
export type SnapTrustScore = {
  subjectId: string;
  confidenceLevel?: number;
  value: number;
  trustScoreScope: string;
  rank?: number;
  accuracy?: number;
  result: number;
};
