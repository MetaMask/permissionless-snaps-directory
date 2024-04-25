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
