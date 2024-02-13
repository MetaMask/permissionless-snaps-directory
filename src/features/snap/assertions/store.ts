import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchSnapAssertionsForSnapId } from './api';
import { type SnapAssertion, SnapCurrentStatus } from './types';
import { type ApplicationState } from '../../../store';

export type SnapAssertionState = {
  snapId: string;
  endorsementsCount: number;
  reportsCount: number;
};

export type SnapAssertionsState = {
  snapAssertions: SnapAssertionState[];
};

const initialState: SnapAssertionsState = {
  snapAssertions: [],
};

const getAssertionsByCurrentStatus = (
  newSnapAssertions: SnapAssertion[],
  status: SnapCurrentStatus,
) => {
  return newSnapAssertions.filter(
    (assertion) =>
      assertion.assertion.credentialSubject.currentStatus === status,
  );
};

export const snapAssertionsSlice = createSlice({
  name: 'snapAssertions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSnapAssertionsForSnapId.fulfilled, (state, action) => {
      const otherSnapAssertionStates = state.snapAssertions.filter(
        (assertion) => assertion.snapId !== `snap://${action.payload.snapId}`,
      );
      const newSnapAssertions = action.payload.assertions.filter(
        (assertion) =>
          assertion.assertion.credentialSubject.id ===
          `snap://${action.payload.snapId}`,
      );
      const updateSnapAssertionState: SnapAssertionState = {
        snapId: `snap://${action.payload.snapId}`,
        endorsementsCount: getAssertionsByCurrentStatus(
          newSnapAssertions,
          SnapCurrentStatus.Endorsed,
        ).length,
        reportsCount: getAssertionsByCurrentStatus(
          newSnapAssertions,
          SnapCurrentStatus.Disputed,
        ).length,
      };
      state.snapAssertions = [
        ...otherSnapAssertionStates,
        updateSnapAssertionState,
      ];
    });
  },
});

// Selector to get snapAssertions from the store
export const getSnapAssertions = createSelector(
  (state: ApplicationState) => state.snapAssertions,
  ({ snapAssertions }) => snapAssertions,
);

// Selector to get snapAssertions for a specific snapId
export const getSnapAssertionDetailsForSnapId = (snapId: string) =>
  createSelector(
    getSnapAssertions,
    (snapAssertions) =>
      snapAssertions?.find(
        (assertion) => assertion.snapId === `snap://${snapId}`,
      ) ?? {
        snapId,
        endorsementsCount: 0,
        reportsCount: 0,
      },
  );
