import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchTrustScoreForAccountId } from './api';
import { type TrustScoreScope } from './types';
import { type ApplicationState } from '../../../store';

export type AccountTrustScoreState = {
  accountId: string;
  result: number;
  accuracy: number | undefined;
  trustScoreScope: TrustScoreScope;
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
          (trustScore) => trustScore.accountId !== accountId,
        );

        const updateAccountTrustScores: AccountTrustScoreState[] =
          trustScorePayloads.map((trustScorePayload) => ({
            accountId: trustScorePayload.subjectId,
            result: trustScorePayload.result,
            accuracy: trustScorePayload.accuracy,
            trustScoreScope: trustScorePayload.trustScoreScope,
          }));

        state.accountTrustScores = [
          ...otherAccountsTrustScores,
          ...updateAccountTrustScores,
        ];
      }
    });
  },
});

// Selector to get accountTrustScores from the store
export const getAccountTrustScores = createSelector(
  (state: ApplicationState) => state.accountTrustScores,
  ({ accountTrustScores }) => accountTrustScores,
);

// Selector to get accountTrustScores for a specific accountId
export const getAccountTrustScoreForAccountId = (accountId: string) =>
  createSelector(getAccountTrustScores, (accountTrustScores) =>
    accountTrustScores?.filter(
      (accountTrustScore) => accountTrustScore.accountId === accountId,
    ),
  );
