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
) => {
  const accountConnections: AccountConnections = {
    nodes: [],
    links: [],
  };
  if (level === 1) {
    accountConnections.nodes.push({
      id: accountId,
      group: level,
      isMain: level === 1,
    });
  }
  const endorsementsOnAccount = accountAssertions.accountAssertions.filter(
    (assertion) => assertion.accountId === accountId,
  );
  const topTwoConnections = endorsementsOnAccount.slice(0, 2);
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
    const connectedNodeLevel = level + 1;
    topTwoConnections.forEach((connection) => {
      const issuerConnections = getConnectedNodesForLevel(
        accountAssertions,
        connection.issuer,
        connectedNodeLevel,
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
