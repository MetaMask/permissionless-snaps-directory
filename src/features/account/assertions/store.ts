import { createSelector, createSlice } from '@reduxjs/toolkit';

import {
  fetchAccountAssertionsForAccountId,
  fetchAssertionsByIssuer,
  fetchAssertionsForAllAccounts,
} from './api';
import type { AccountAssertion, Trustworthiness } from './types';
import { type ApplicationState } from '../../../store';

export type AccountAssertionState = {
  accountId: string;
  issuer: string;
  trustworthiness: Trustworthiness[];
  statusReason: { type: string; value: string[] };
  creationAt: Date;
  issuanceDate: Date;
};

export type AccountAssertionsState = {
  accountAssertions: AccountAssertionState[];
  issuedAssertions: AccountAssertionState[];
};

const initialState: AccountAssertionsState = {
  accountAssertions: [],
  issuedAssertions: [],
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
              statusReason: assertion.assertion.credentialSubject.statusReason,
              creationAt: assertion.creationAt,
              issuanceDate: assertion.assertion.issuanceDate,
            };
          });
        state.accountAssertions = [
          ...otherAccountAssertionStates,
          ...updateAccountAssertionStates,
        ];
      },
    );

    builder.addCase(
      fetchAssertionsForAllAccounts.fulfilled,
      (state, action) => {
        const accountAssertions = action.payload;
        state.accountAssertions = accountAssertions.map((assertion) => {
          return {
            accountId: assertion.assertion.credentialSubject.id,
            issuer: assertion.assertion.issuer,
            trustworthiness:
              assertion.assertion.credentialSubject.trustworthiness,
            statusReason: assertion.assertion.credentialSubject.statusReason,
            creationAt: assertion.creationAt,
            issuanceDate: assertion.assertion.issuanceDate,
          };
        });
      },
    );

    builder.addCase(fetchAssertionsByIssuer.fulfilled, (state, action) => {
      const issuedAssertions = action.payload.assertions;
      const orderedAssertions = issuedAssertions.sort(
        (a: AccountAssertion, b: AccountAssertion) =>
          new Date(b.assertion.issuanceDate).getTime() -
          new Date(a.assertion.issuanceDate).getTime(),
      );
      const last10Assertions = orderedAssertions.slice(0, 10);
      state.issuedAssertions = last10Assertions.map((assertion) => {
        return {
          accountId: assertion.assertion.credentialSubject.id,
          issuer: assertion.assertion.issuer,
          trustworthiness:
            assertion.assertion.credentialSubject.trustworthiness,
          statusReason: assertion.assertion.credentialSubject.statusReason,
          creationAt: assertion.creationAt,
          issuanceDate: assertion.assertion.issuanceDate,
        };
      });
    });
  },
});

// Selector to get accountAssertions from the store
export const getAccountAssertions = createSelector(
  (state: ApplicationState) => state.accountAssertions,
  ({ accountAssertions }) => accountAssertions,
);

// Selector to get issuedAssertions from the store
export const getIssuedAssertions = createSelector(
  (state: ApplicationState) => state.issuedAssertions,
  ({ issuedAssertions }) => issuedAssertions,
);

export const getIssuedAssertionsForIssuerId = (issuerId: string) =>
  createSelector(getIssuedAssertions, (issuedAssertions) =>
    issuedAssertions.filter((assertion) => assertion.issuer === issuerId),
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

    return filteredAssertions.length !== 0;
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

    return filteredAssertions.length !== 0;
  });
