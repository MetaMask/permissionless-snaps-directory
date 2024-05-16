// TODO: Create a common package for shared types
export type User = {
  id: string;
  preferredName: string | undefined;
  website: string | undefined;
  endorsementCount: number;
  disputeCount: number;
  createdAt: string;
  rank: number | null;
};

export enum FilterType {
  Auditors = 'AUDITORS',
  Builders = 'BUILDERS',
  SecurityEngineers = 'SECURITY_ENGINEERS',
  SoftwareEngineers = 'SOFTWARE_ENGINEERS',
  ReportedUsers = 'REPORTED_USERS',
  EndorsedBy = 'ENDORSED_BY',
  ReportedBy = 'REPORTED_BY',
  Endorsed = 'ENDORSED',
}
