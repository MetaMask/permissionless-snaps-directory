import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchAccountAssertionsForAccountId } from './api';
import { type Trustworthiness } from './types';
import { type ApplicationState } from '../../../store';

export type AccountAssertionState = {
  accountId: string;
  issuer: string;
  trustworthiness: Trustworthiness[];
  creationAt: Date;
};

export type AccountAssertionsState = {
  accountAssertions: AccountAssertionState[];
};

const initialState: AccountAssertionsState = {
  accountAssertions: [],
};

const getAccountAssertionsWithCurrentStatusForIssuer = (
  accountAssertions: AccountAssertionState[],
  issuer: string,
  accountId: string,
) => {
  return accountAssertions.filter(
    (assertion) =>
      assertion.issuer === issuer && assertion.accountId === accountId,
  );
};

export const accountAssertionsSlice = createSlice({
  name: 'accountAssertions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAccountAssertionsForAccountId.fulfilled,
      (state, action) => {
        const otherAccountAssertionStates = state.accountAssertions.filter(
          (assertion) => assertion.accountId !== action.payload.accountId,
        );
        const newAccountAssertions = action.payload.assertions;
        const updateAccountAssertionStates: AccountAssertionState[] =
          newAccountAssertions.map((assertion) => {
            return {
              accountId: assertion.assertion.credentialSubject.id,
              issuer: assertion.assertion.issuer,
              trustworthiness:
                assertion.assertion.credentialSubject.trustworthiness,
              creationAt: assertion.creationAt,
            };
          });
        state.accountAssertions = [
          ...otherAccountAssertionStates,
          ...updateAccountAssertionStates,
        ];
      },
    );
  },
});

// Selector to get accountAssertions from the store
export const getAccountAssertions = createSelector(
  (state: ApplicationState) => state.accountAssertions,
  ({ accountAssertions }) => accountAssertions,
);

// Selector to get accountAssertions for a specific accountId
export const getAccountAssertionDetailsForAccountId = (accountId: string) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    return {
      accountId,
      endorsementsCount: accountAssertions.filter(
        (assertion) =>
          assertion.accountId === accountId &&
          assertion.trustworthiness.filter(
            (trustworthiness) => trustworthiness.level >= 0,
          ).length > 0,
      ).length,
      reportsCount: accountAssertions.filter(
        (assertion) =>
          assertion.accountId === accountId &&
          assertion.trustworthiness.filter(
            (trustworthiness) => trustworthiness.level < 0,
          ).length > 0,
      ).length,
    };
  });

export const getCurrentTrustworthinessLevelForIssuer = (
  accountId: string,
  issuer: string,
) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const filteredAssertions = accountAssertions.filter(
      (assertion) =>
        assertion.issuer === issuer && assertion.accountId === accountId,
    );
    if (filteredAssertions.length === 0) {
      return undefined;
    }
    const latestTrustworthiness = filteredAssertions.reduce(
      (latest, assertion) =>
        assertion.creationAt > latest.creationAt ? assertion : latest,
    ).trustworthiness[0];
    return latestTrustworthiness?.level;
  });

export const isAccountEndorsedByIssuer = (accountId: string, issuer: string) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const filteredAssertions = getAccountAssertionsWithCurrentStatusForIssuer(
      accountAssertions,
      issuer,
      accountId,
    ).filter(
      (assertion) =>
        assertion.trustworthiness.filter(
          (trustworthiness) => trustworthiness.level >= 0,
        ).length > 0,
    );

    if (filteredAssertions.length === 0) {
      return false;
    }
    return true;
  });

export const isAccountReportedByIssuer = (accountId: string, issuer: string) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const filteredAssertions = getAccountAssertionsWithCurrentStatusForIssuer(
      accountAssertions,
      issuer,
      accountId,
    ).filter(
      (assertion) =>
        assertion.trustworthiness.filter(
          (trustworthiness) => trustworthiness.level < 0,
        ).length > 0,
    );
    if (filteredAssertions.length === 0) {
      return false;
    }
    return true;
  });
