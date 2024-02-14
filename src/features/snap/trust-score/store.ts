import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchTrustScoreForSnapId } from './api';
import { type ApplicationState } from '../../../store';

export type SnapTrustScoreState = {
  snapId: string;
  result: number;
};

export type SnapsTrustScoresState = {
  snapTrustScores: SnapTrustScoreState[];
};

const initialState: SnapsTrustScoresState = {
  snapTrustScores: [],
};

export const snapTrustScoresSlice = createSlice({
  name: 'snapTrustScoresSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrustScoreForSnapId.fulfilled, (state, action) => {
      const otherSnapsTrustScores = state.snapTrustScores.filter(
        (trustScore) => trustScore.snapId !== action.payload.subjectId,
      );

      const updateSnapTrustScore: SnapTrustScoreState = {
        snapId: action.payload.subjectId,
        result: action.payload.result,
      };
      state.snapTrustScores = [...otherSnapsTrustScores, updateSnapTrustScore];
    });
  },
});

// Selector to get snapTrustScores from the store
export const getSnapTrustScores = createSelector(
  (state: ApplicationState) => state.snapTrustScores,
  ({ snapTrustScores }) => snapTrustScores,
);

// Selector to get snapTrustScore for a specific snapId
export const getSnapTrustScoreForSnapId = (snapId: string) =>
  createSelector(
    getSnapTrustScores,
    (snapTrustScores) =>
      snapTrustScores?.find(
        (snapTrustScore) => snapTrustScore.snapId === `snap://${snapId}`,
      ) ?? {
        snapId,
        result: -1,
      },
  );
