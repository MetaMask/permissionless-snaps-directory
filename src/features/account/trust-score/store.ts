import { createSelector, createSlice } from '@reduxjs/toolkit';

import {
  fetchTrustScoreForAccountId,
  fetchTrustScoreForAllAccounts,
} from './api';
import { type TrustScoreScope } from './types';
import { type ApplicationState } from '../../../store';

export type AccountTrustScoreState = {
  accountId: string;
  result: number;
  accuracy?: number | undefined;
  trustScoreScope: TrustScoreScope;
  rank?: number | undefined;
};

export type AccountsTrustScoresState = {
  accountTrustScores: AccountTrustScoreState[];
};

const initialState: AccountsTrustScoresState = {
  accountTrustScores: [],
};

export const accountTrustScoresSlice = createSlice({
  name: 'accountTrustScoresSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrustScoreForAccountId.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        const accountId = action.meta.arg;
        const trustScorePayloads = action.payload;
        const otherAccountsTrustScores = state.accountTrustScores.filter(
          (trustScore) =>
            trustScore?.accountId.toLowerCase() !== accountId.toLowerCase(),
        );

        const updateAccountTrustScores: AccountTrustScoreState[] =
          trustScorePayloads.map((trustScorePayload) => ({
            accountId: trustScorePayload.subjectId,
            result: trustScorePayload.result,
            accuracy: trustScorePayload.accuracy,
            trustScoreScope: trustScorePayload.trustScoreScope,
            rank: trustScorePayload.rank,
          }));

        state.accountTrustScores = [
          ...otherAccountsTrustScores,
          ...updateAccountTrustScores,
        ];
      }
    });
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
  (state: ApplicationState) => state.accountTrustScores,
  ({ accountTrustScores }) => accountTrustScores,
);

// Selector to get accountTrustScores for a specific accountId
export const getAccountTrustScoreForAccountId = (accountId: string) =>
  createSelector(getAccountsTrustScores, (accountTrustScores) =>
    accountTrustScores?.filter(
      (accountTrustScore) =>
        accountTrustScore.accountId.toLowerCase() === accountId.toLowerCase(),
    ),
  );

export const getTopAccountsForScope = (
  topCounter: number,
  trustScoreScope: TrustScoreScope,
) =>
  createSelector(
    getAccountsTrustScores,
    (accountTrustScores) =>
      accountTrustScores
        .filter(
          (score) =>
            score.trustScoreScope === trustScoreScope && score.result >= 0,
        )
        .sort(
          (a, b) =>
            (a.rank ?? accountTrustScores.length) -
            (b.rank ?? accountTrustScores.length),
        )
        .slice(0, topCounter), // Getting the top counter accounts
  );
