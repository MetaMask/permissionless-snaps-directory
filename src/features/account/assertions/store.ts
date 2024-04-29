import { createSelector, createSlice } from '@reduxjs/toolkit';

import {
  fetchAccountAssertionsForAccountId,
  fetchAssertionsByIssuer,
  fetchAssertionsForAllAccounts,
} from './api';
import type { SubjectType, Value } from './enums';
import type { AccountAssertion, Trustworthiness } from './types';
import { TrustworthinessScope } from './types';
import { type ApplicationState } from '../../../store';

export type AccountAssertionState = {
  subjectId: string;
  issuerId: string;
  trustworthiness: Trustworthiness[];
  statusReason: { type: string; value: string[] };
  creationAt: Date;
  issuanceDate: Date;
  subjectType: SubjectType;
  value: Value;
  reasons: string[];
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
  issuerId: string,
  accountId: string,
) => {
  return accountAssertions.filter(
    (assertion) =>
      assertion.issuerId === issuerId && assertion.subjectId === accountId,
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
          (assertion) => assertion.subjectId !== action.payload.accountId,
        );
        const newAccountAssertions = action.payload.assertions;
        const updateAccountAssertionStates: AccountAssertionState[] =
          newAccountAssertions.map((assertion) => {
            return {
              subjectId: assertion.subjectId,
              issuerId: assertion.issuerId,
              trustworthiness:
                assertion.assertion.credentialSubject.trustworthiness,
              statusReason: assertion.assertion.credentialSubject.statusReason,
              creationAt: assertion.creationAt,
              issuanceDate: assertion.assertion.issuanceDate,
              subjectType: assertion.subjectType,
              value: assertion.value,
              reasons: assertion.reasons,
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
            subjectId: assertion.subjectId,
            issuerId: assertion.issuerId,
            trustworthiness:
              assertion.assertion.credentialSubject.trustworthiness,
            statusReason: assertion.assertion.credentialSubject.statusReason,
            creationAt: assertion.creationAt,
            issuanceDate: assertion.assertion.issuanceDate,
            subjectType: assertion.subjectType,
            value: assertion.value,
            reasons: assertion.reasons,
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
          subjectId: assertion.subjectId,
          issuerId: assertion.issuerId,
          trustworthiness:
            assertion.assertion.credentialSubject.trustworthiness,
          statusReason: assertion.assertion.credentialSubject.statusReason,
          creationAt: assertion.creationAt,
          issuanceDate: assertion.assertion.issuanceDate,
          subjectType: assertion.subjectType,
          value: assertion.value,
          reasons: assertion.reasons,
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
    issuedAssertions.filter((assertion) => assertion.issuerId === issuerId),
  );

// Selector to get accountAssertions for a specific accountId
export const getAccountAssertionDetailsForAccountId = (accountId: string) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    return {
      accountId,
      endorsementsCount: accountAssertions.filter(
        (assertion) =>
          assertion.subjectId === accountId &&
          assertion.trustworthiness.filter(
            (trustworthiness) => trustworthiness.level >= 0,
          ).length > 0,
      ).length,
      reportsCount: accountAssertions.filter(
        (assertion) =>
          assertion.subjectId === accountId &&
          assertion.trustworthiness.filter(
            (trustworthiness) => trustworthiness.level < 0,
          ).length > 0,
      ).length,
    };
  });

// Selector to get endorsements for a specific accountId
export const getTechnicalEndorsementsForAccountId = (accountId: string) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const developmentEndorsements: AccountAssertionState[] = [];
    const securityEndorsements: AccountAssertionState[] = [];

    const assertionsForAccountId = accountAssertions.filter(
      (assertion) => assertion.subjectId === accountId,
    );

    const orderedAssertions = [...assertionsForAccountId].sort(
      (a: AccountAssertionState, b: AccountAssertionState) =>
        new Date(b.issuanceDate).getTime() - new Date(a.issuanceDate).getTime(),
    );

    developmentEndorsements.push(
      ...orderedAssertions.filter((assertion) =>
        assertion.reasons.includes(
          TrustworthinessScope.SoftwareDevelopment.toString(),
        ),
      ),
    );

    securityEndorsements.push(
      ...orderedAssertions.filter((assertion) =>
        assertion.reasons.includes(
          TrustworthinessScope.SoftwareSecurity.toString(),
        ),
      ),
    );

    return [
      {
        type: TrustworthinessScope.SoftwareDevelopment,
        endorsements: developmentEndorsements,
      },
      {
        type: TrustworthinessScope.SoftwareSecurity,
        endorsements: securityEndorsements,
      },
    ];
  });

export const getCurrentTrustworthinessLevelForIssuer = (
  accountId: string,
  issuerId: string,
) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const filteredAssertions = accountAssertions.filter(
      (assertion) =>
        assertion.issuerId === issuerId && assertion.subjectId === accountId,
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

export const isAccountEndorsedByIssuer = (
  accountId: string,
  issuerId: string,
) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const filteredAssertions = getAccountAssertionsWithCurrentStatusForIssuer(
      accountAssertions,
      issuerId,
      accountId,
    ).filter(
      (assertion) =>
        assertion.trustworthiness.filter(
          (trustworthiness) => trustworthiness.level >= 0,
        ).length > 0,
    );

    return filteredAssertions.length !== 0;
  });

export const isAccountReportedByIssuer = (
  accountId: string,
  issuerId: string,
) =>
  createSelector(getAccountAssertions, (accountAssertions) => {
    const filteredAssertions = getAccountAssertionsWithCurrentStatusForIssuer(
      accountAssertions,
      issuerId,
      accountId,
    ).filter(
      (assertion) =>
        assertion.trustworthiness.filter(
          (trustworthiness) => trustworthiness.level < 0,
        ).length > 0,
    );

    return filteredAssertions.length !== 0;
  });
