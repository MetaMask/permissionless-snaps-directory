import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { Address } from '@wagmi/core';
import semver from 'semver/preload';
import type { Hex } from 'viem';

import { fetchAuditors, getInstalledSnaps } from './api';
import type { RegistrySnapCategory } from '../../constants';
import type { ApplicationState } from '../../store';
import type { Fields } from '../../utils';
import { Order } from '../filter/constants';
import { SORT_FUNCTIONS } from '../filter/sort';

export type Snap = Fields<
  Queries.Snap,
  | 'id'
  | 'snapId'
  | 'name'
  | 'author'
  | 'summary'
  | 'icon'
  | 'category'
  | 'gatsbyPath'
  | 'latestVersion'
  | 'downloads'
  | 'lastUpdated'
  | 'latestChecksum'
  | 'versions'
>;

export type SnapsState = {
  snaps: Snap[] | null;
};

const initialState: SnapsState = {
  snaps: null,
};

export const snapsSlice = createSlice({
  name: 'snaps',
  initialState,
  reducers: {
    setSnaps: (state, action: PayloadAction<Snap[]>) => {
      state.snaps = action.payload;
    },
  },
});

export const { setSnaps } = snapsSlice.actions;

export const getSnaps = createSelector(
  (state: ApplicationState) => state.snaps,
  ({ snaps }) => snaps,
);

type GetFilteredSnapsOptions = {
  order?: Order | undefined;
  category?: RegistrySnapCategory | undefined;
  limit?: number | undefined;
  excluded?: string[] | undefined;
  author?: Address | undefined;
};

/**
 * Get Snaps based on the given filter options.
 *
 * @param options - The options to use when filtering the Snaps.
 * @param options.order - The order to sort the Snaps by. Defaults to
 * `Order.Popularity`.
 * @param options.category - The category to filter the Snaps by. Only Snaps
 * with the given category will be returned. If not provided, all Snaps will be
 * returned.
 * @param options.limit - The maximum number of Snaps to return. If not
 * provided, all Snaps will be returned.
 * @param options.excluded - An array of Snap IDs to exclude from the results.
 * @param options.author - The address of the author to filter the Snaps by. If not
 * provided, all Snaps will be returned.
 * @returns A selector that returns the filtered Snaps.
 */
export const getSnapsByFilter = ({
  order = Order.Popularity,
  category,
  limit,
  excluded = [],
  author,
}: GetFilteredSnapsOptions) =>
  createSelector(
    (state: ApplicationState) => getSnaps(state),
    (snaps) => {
      if (!snaps) {
        return null;
      }

      const filteredSnaps = snaps.filter(
        (snap) =>
          !excluded.includes(snap.snapId) &&
          (!category || snap.category === category) &&
          (!author ||
            snap.author?.address?.toLowerCase() === author.toLowerCase()),
      );

      return SORT_FUNCTIONS[order](filteredSnaps).slice(0, limit);
    },
  );

export const getSnapsById = (snapIds: string[]) => {
  return createSelector(
    (state: ApplicationState) => getSnaps(state),
    (snaps) => {
      if (!snaps) {
        return [];
      }

      return snaps.filter((snap) => snapIds.includes(snap.snapId));
    },
  );
};

export const getSnapByChecksum = (checksum: string) => {
  return createSelector(
    (state: ApplicationState) => getSnaps(state),
    (snaps) => {
      if (!snaps || snaps.length === 0) {
        return undefined;
      }

      return snaps.find((snap) =>
        snap.versions?.some(
          (snapVersion) => snapVersion?.checksum === checksum,
        ),
      );
    },
  );
};

export const getUpdateAvailable = (snapId: string) =>
  createSelector(
    (state: ApplicationState) => ({
      installedSnaps: getInstalledSnaps(state),
      snaps: getSnaps(state),
    }),
    ({ installedSnaps, snaps }) => {
      const installedVersion = installedSnaps?.[snapId]?.version;
      if (!installedVersion) {
        return false;
      }

      const snap = snaps?.find((item) => item.snapId === snapId);
      if (!snap) {
        return false;
      }

      return semver.gt(snap.latestVersion, installedVersion);
    },
  );

export const getUpdatableSnaps = createSelector(
  (state: ApplicationState) => ({
    snapIds: Object.keys(getInstalledSnaps(state)).filter((snapId) =>
      getUpdateAvailable(snapId)(state),
    ),
    snaps: getSnaps(state),
  }),
  ({ snapIds, snaps }) =>
    snapIds
      .map((snapId) => snaps?.find((item) => item.snapId === snapId))
      .filter(Boolean) as Snap[],
);

export type AuditorsState = {
  auditors: { name: string; address: string }[] | null;
};

const initialAuditorsState: AuditorsState = {
  auditors: null,
};

export const auditorsSlice = createSlice({
  name: 'auditors',
  initialState: initialAuditorsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuditors.fulfilled, (state, action) => {
      const auditors = action.payload;
      state.auditors = auditors;
    });
  },
});

export const getAuditorAddressesByNames = (auditorNames: string[]) =>
  createSelector(
    (state: ApplicationState) => ({
      auditors: state.auditors.auditors,
    }),
    ({ auditors }) => {
      if (!auditors) {
        return [];
      }
      const auditorAddresses = auditors
        ?.filter((item) => auditorNames.includes(item.name))
        .map((item) => item.address);
      return auditorAddresses as Hex[];
    },
  );

export const isAuditor = (address: Address) =>
  createSelector(
    (state: ApplicationState) => ({
      auditors: state.auditors.auditors,
    }),
    ({ auditors }) => {
      if (!auditors) {
        return false;
      }
      return (
        auditors.filter((auditor) => auditor.address === address).length > 0
      );
    },
  );

export const isBuilder = (address: Address) =>
  createSelector(
    (state: ApplicationState) => getSnaps(state),
    (snaps) => {
      if (!snaps || snaps.length === 0) {
        return false;
      }

      return (
        snaps.filter(
          (snap) =>
            snap.author?.address?.toLowerCase() === address.toLowerCase(),
        ).length > 0
      );
    },
  );
