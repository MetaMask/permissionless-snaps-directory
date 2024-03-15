import { createSelector } from '@reduxjs/toolkit';

import { type ApplicationState } from '../../../store';
import { type AccountAssertionsState } from '../assertions/store';

export type AccountNode = {
  id: string;
  group: number;
  isMain: boolean;
};

export type AccountLink = {
  source: string;
  target: string;
};

export type AccountConnections = {
  nodes: AccountNode[];
  links: AccountLink[];
};

const getConnectedNodesForLevel = (
  accountAssertions: AccountAssertionsState,
  accountId: string,
  level: number,
  ignoreAccountIds: string[] = [],
) => {
  const accountConnections: AccountConnections = {
    nodes: [],
    links: [],
  };
  // As level 1 is called from outside, the main account is added.
  if (level === 1) {
    accountConnections.nodes.push({
      id: accountId,
      group: level,
      isMain: level === 1,
    });
  }

  // Find assertions for the account ignoring the previous ones
  const endorsementsOnAccount = accountAssertions.accountAssertions.filter(
    (assertion) =>
      assertion.accountId === accountId &&
      !ignoreAccountIds.includes(assertion.issuer.toLowerCase()),
  );

  // Get top 2 connections for the account
  const topTwoConnections = endorsementsOnAccount.slice(0, 2);

  // Adding the top two connections to the final result
  topTwoConnections.forEach((connection) => {
    accountConnections.links.push({
      source: connection.accountId,
      target: connection.issuer,
    });
    accountConnections.nodes.push({
      id: connection.issuer,
      group: level + 1,
      isMain: false,
    });
  });

  if (level < 2) {
    // Increase the level
    const connectedNodeLevel = level + 1;

    // Add current accounts to ignored list
    ignoreAccountIds.push(
      ...accountConnections.nodes.map((node) => node.id.toLowerCase()),
    );

    // For each level the top two connections are added to final result
    topTwoConnections.forEach((connection) => {
      const issuerConnections = getConnectedNodesForLevel(
        accountAssertions,
        connection.issuer,
        connectedNodeLevel,
        ignoreAccountIds,
      );
      accountConnections.links.push(...issuerConnections.links);
      accountConnections.nodes.push(...issuerConnections.nodes);
    });
  }
  return accountConnections;
};

export const getAccountConnectedNodes = (accountId: string) =>
  createSelector(
    (state: ApplicationState) => state.accountAssertions,
    (accountAssertions) => {
      return getConnectedNodesForLevel(accountAssertions, accountId, 1);
    },
  );
