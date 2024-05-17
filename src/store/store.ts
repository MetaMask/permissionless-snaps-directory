import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { NoInfer } from '@reduxjs/toolkit/src/tsHelpers';
import type { CombinedState, PreloadedState } from 'redux';

// Imported separately to avoid circular dependencies.
import { accountAssertionsSlice } from '../features/account/assertions/store';
import { accountProfileSlice } from '../features/account/store';
import { accountTrustScoresSlice } from '../features/account/trust-score/store';
import { filterSlice } from '../features/filter/store';
import { notificationsSlice } from '../features/notifications/store';
import { snapAssertionsSlice } from '../features/snap/assertions/store';
import { snapTrustScoresSlice } from '../features/snap/trust-score/store';
import { snapsApi } from '../features/snaps/api';
import { auditorsSlice, snapsSlice } from '../features/snaps/store';
import { filterUsersSlice } from '../features/users/store';

const reducer = combineReducers({
  accountProfile: accountProfileSlice.reducer,
  auditors: auditorsSlice.reducer,
  filter: filterSlice.reducer,
  notifications: notificationsSlice.reducer,
  snaps: snapsSlice.reducer,
  snapsApi: snapsApi.reducer,
  snapAssertions: snapAssertionsSlice.reducer,
  snapTrustScores: snapTrustScoresSlice.reducer,
  accountAssertions: accountAssertionsSlice.reducer,
  issuedAssertions: accountAssertionsSlice.reducer,
  accountTrustScores: accountTrustScoresSlice.reducer,
  users: filterUsersSlice.reducer,
});

/**
 * Create the Redux store.
 *
 * @param preloadedState - The initial state of the store.
 * @returns The Redux store.
 */
export function createStore(
  preloadedState: PreloadedState<CombinedState<NoInfer<ApplicationState>>> = {},
) {
  const store = configureStore({
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).concat(snapsApi.middleware),
    reducer,
  });

  // This prefetches the installed Snaps on app load, so we can show them on the
  // home page.
  store
    .dispatch(
      snapsApi.endpoints.getInstalledSnaps.initiate(undefined, {
        forceRefetch: true,
      }),
    )
    .catch(console.error);

  // This saves the notifications state to localStorage, so we can persist it
  // across page loads.
  store.subscribe(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        'notifications',
        JSON.stringify(store.getState().notifications),
      );
    }
  });

  return store;
}

export type ApplicationState = ReturnType<typeof reducer>;

export type ApplicationDispatch = ReturnType<typeof createStore>['dispatch'];
