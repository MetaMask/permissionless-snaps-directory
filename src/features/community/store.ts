import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchTrustScoreForAllAccounts } from './api';
import { TrustScoreScope } from './types';
import { type ApplicationState } from '../../store';

export type AccountTrustScoreState = {
  accountId: string;
  result: number;
  accuracy: number | undefined;
  trustScoreScope: TrustScoreScope;
  rank?: number | undefined;
};

export type AccountsTrustScoresState = {
  accountTrustScores: AccountTrustScoreState[];
};

const initialState: AccountsTrustScoresState = {
  accountTrustScores: [],
};

export const accountTrustScoresAllSlice = createSlice({
  name: 'accountTrustScoresAllSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTrustScoreForAllAccounts.fulfilled,
      (state, action) => {
        if (action.payload.length > 0) {
          state.accountTrustScores = action.payload.map(
            (trustScorePayload) => ({
              accountId: trustScorePayload.subjectId,
              result: trustScorePayload.result,
              accuracy: trustScorePayload.accuracy,
              trustScoreScope: trustScorePayload.trustScoreScope,
              rank: trustScorePayload.rank,
            }),
          );
        }
      },
    );
  },
});

// Selector to get accountTrustScores from the store
export const getAccountsTrustScores = createSelector(
  (state: ApplicationState) => state.accountTrustScoresAll,
  ({ accountTrustScores }) => accountTrustScores,
);

export const getTopSoftwareDevelopers = (topCounter: number) =>
  createSelector(
    getAccountsTrustScores,
    (accountTrustScores) =>
      accountTrustScores
        .filter(
          (score) =>
            score.trustScoreScope === TrustScoreScope.SoftwareDevelopment,
        )
        .sort((a, b) => {
          if (a.rank === undefined && b.rank === undefined) {
            return 0; // If both ranks are undefined, consider them equal
          }
          if (a.rank === undefined) {
            return 1; // Move undefined ranks to the end
          }
          if (b.rank === undefined) {
            return -1; // Move undefined ranks to the end
          }
          return a.rank - b.rank; // Sort numbers in ascending order
        })
        .slice(0, topCounter), // Getting the top counter accounts
  );

export const getTopSoftwareAuditors = (topCounter: number) =>
  createSelector(
    getAccountsTrustScores,
    (accountTrustScores) =>
      accountTrustScores
        .filter(
          (score) => score.trustScoreScope === TrustScoreScope.SoftwareSecurity,
        )
        .sort((a, b) => {
          if (a.rank === undefined && b.rank === undefined) {
            return 0; // If both ranks are undefined, consider them equal
          }
          if (a.rank === undefined) {
            return 1; // Move undefined ranks to the end
          }
          if (b.rank === undefined) {
            return -1; // Move undefined ranks to the end
          }
          return a.rank - b.rank; // Sort numbers in ascending order
        })
        .slice(0, topCounter), // Getting the top counter accounts
  );
