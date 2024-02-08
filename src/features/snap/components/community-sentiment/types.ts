export enum SentimentType {
  InsufficientReview = 'Insufficient Reviews',
  Secured = 'Secured',
  InReview = 'In Review',
  Unsecured = 'Unsecured',
  UserFriendly = 'User friendly',
}

export type SentimentData = {
  type: SentimentType;
  endorsements: number;
  reports: number;
};
