import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchSnapAssertionsForSnapId } from './api';
import { SnapCurrentStatus } from './types';
import { type ApplicationState } from '../../../store';

export type SnapAssertionState = {
  snapId: string;
  issuer: string;
  currentStatus: SnapCurrentStatus;
  creationAt: Date;
};

export type SnapAssertionsState = {
  snapAssertions: SnapAssertionState[];
};

const initialState: SnapAssertionsState = {
  snapAssertions: [],
};

const getSnapAssertionsWithCurrentStatusForIssuer = (
  snapAssertions: SnapAssertionState[],
  issuer: string,
  snapId: string,
  snapCurrentStatus: SnapCurrentStatus,
) => {
  return snapAssertions.filter(
    (assertion) =>
      assertion.issuer === issuer &&
      assertion.snapId === `snap://${snapId}` &&
      assertion.currentStatus === snapCurrentStatus,
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
      const newSnapAssertions = action.payload.assertions;
      const updateSnapAssertionStates: SnapAssertionState[] =
        newSnapAssertions.map((assertion) => {
          return {
            snapId: assertion.assertion.credentialSubject.id,
            issuer: assertion.assertion.issuer,
            currentStatus: assertion.assertion.credentialSubject.currentStatus,
            creationAt: assertion.creationAt,
          };
        });
      state.snapAssertions = [
        ...otherSnapAssertionStates,
        ...updateSnapAssertionStates,
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
  createSelector(getSnapAssertions, (snapAssertions) => {
    return {
      snapId: `snap://${snapId}`,
      endorsementsCount: snapAssertions.filter(
        (assertion) =>
          assertion.snapId === `snap://${snapId}` &&
          assertion.currentStatus === SnapCurrentStatus.Endorsed,
      ).length,
      reportsCount: snapAssertions.filter(
        (assertion) =>
          assertion.snapId === `snap://${snapId}` &&
          assertion.currentStatus === SnapCurrentStatus.Disputed,
      ).length,
    };
  });

export const getCurrentSnapStatusForIssuer = (snapId: string, issuer: string) =>
  createSelector(getSnapAssertions, (snapAssertions) => {
    const filteredAssertions = snapAssertions.filter(
      (assertion) =>
        assertion.issuer === issuer && assertion.snapId === `snap://${snapId}`,
    );
    if (filteredAssertions.length === 0) {
      return null;
    }
    return filteredAssertions.reduce((latest, assertion) =>
      assertion.creationAt > latest.creationAt ? assertion : latest,
    ).currentStatus;
  });

export const isSnapEndorsedByIssuer = (snapId: string, issuer: string) =>
  createSelector(getSnapAssertions, (snapAssertions) => {
    const filteredAssertions = getSnapAssertionsWithCurrentStatusForIssuer(
      snapAssertions,
      issuer,
      snapId,
      SnapCurrentStatus.Endorsed,
    );

    return filteredAssertions.length !== 0;
  });

export const isSnapReportedByIssuer = (snapId: string, issuer: string) =>
  createSelector(getSnapAssertions, (snapAssertions) => {
    const filteredAssertions = getSnapAssertionsWithCurrentStatusForIssuer(
      snapAssertions,
      issuer,
      snapId,
      SnapCurrentStatus.Disputed,
    );

    return filteredAssertions.length !== 0;
  });
