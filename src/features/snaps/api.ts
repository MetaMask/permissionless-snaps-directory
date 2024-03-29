import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

import { getUpdateAvailable } from './store';
import { SnapEventType, track } from '../../analytics';
import type { ApplicationState } from '../../store';
import { request } from '../../store/api';
import { getErrorMessage } from '../../utils';

enum SnapsTag {
  InstalledSnaps = 'InstalledSnaps',
}

export type InstallSnapArgs = {
  snapId: string;
  version: string;
};

const REGISTRY_URL =
  'https://raw.githubusercontent.com/MetaMask/permissionless-snaps-directory/dev/snaps-registry.json';

export type InstalledSnaps = Record<string, { version: string }>;
export type InstallSnapResult = Record<string, { error: unknown }>;

export const snapsApi = createApi({
  reducerPath: 'snapsApi',
  baseQuery: request,
  tagTypes: [SnapsTag.InstalledSnaps],
  endpoints: (builder) => ({
    getVersion: builder.query<string, void>({
      query: () => ({
        method: 'web3_clientVersion',
      }),
    }),

    getInstalledSnaps: builder.query<InstalledSnaps, void>({
      query: () => ({
        method: 'wallet_getSnaps',
      }),
      providesTags: [SnapsTag.InstalledSnaps],
    }),

    installSnap: builder.mutation<InstallSnapResult, InstallSnapArgs>({
      query: ({ snapId, version }) => ({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: {
            version,
          },
        },
      }),
      onQueryStarted({ snapId, version }, api) {
        const state = api.getState() as ApplicationState;
        const isUpdate = getUpdateAvailable(snapId)(state);

        if (isUpdate) {
          const oldVersion =
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            getInstalledSnap(snapId)(state)?.version as string;

          track({
            type: SnapEventType.Update,
            snapId,
            oldVersion,
            newVersion: version,
          });

          return;
        }

        track({
          type: SnapEventType.Install,
          snapId,
          version,
        });
      },
      transformResponse: (snaps: InstallSnapResult, _, { snapId, version }) => {
        const error = snaps[snapId]?.error;
        if (error) {
          track({
            type: SnapEventType.InstallationFailed,
            snapId,
            version,
            error: getErrorMessage(error),
          });

          throw new Error(`Failed to install snap: ${error}`);
        }

        track({
          type: SnapEventType.Installed,
          snapId,
          version,
        });

        return snaps;
      },
      transformErrorResponse(error, _, { snapId, version }) {
        const message = getErrorMessage(error);
        if (message === 'User rejected the request.') {
          track({
            type: SnapEventType.InstallationRejected,
            snapId,
            version,
          });

          return error;
        }

        track({
          type: SnapEventType.InstallationFailed,
          snapId,
          version,
          error: getErrorMessage(error),
        });

        return error;
      },
      invalidatesTags: [SnapsTag.InstalledSnaps],
    }),
  }),
});

export const fetchAuditors = createAsyncThunk(
  'snap/fetchAuditors',
  async () => {
    try {
      const response = await axios.get(REGISTRY_URL);
      const auditors: { name: string; address: string }[] = Object.entries(
        response.data.auditors as { [key: string]: { address: string } }, // Type assertion
      ).map(([name, details]) => ({
        name,
        address: (details as { address: string }).address, // Type assertion
      }));
      return auditors as { name: string; address: string }[];
    } catch (error) {
      return [] as { name: string; address: string }[];
    }
  },
);

export const {
  useGetVersionQuery,
  useGetInstalledSnapsQuery,
  useInstallSnapMutation,
} = snapsApi;

export const getInstalledSnaps = createSelector(
  (state: ApplicationState) => state,
  (state) => snapsApi.endpoints.getInstalledSnaps.select()(state).data ?? {},
);

export const getInstalledSnap = (snapId: string) =>
  createSelector(
    (state: ApplicationState) => getInstalledSnaps(state),
    (state) => state[snapId] ?? null,
  );
