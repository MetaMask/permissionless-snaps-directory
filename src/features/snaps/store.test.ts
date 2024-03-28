import { mock } from 'ts-mockito';

import { fetchAuditors } from './api';
import {
  auditorsSlice,
  getAuditorAddressesByNames,
  getSnapByChecksum,
  getSnaps,
  getUpdatableSnaps,
  getUpdateAvailable,
  setSnaps,
  snapsSlice,
} from './store';
import type { ApplicationState } from '../../store';
import {
  getMockQueryResponse,
  getMockSnap,
  getMockState,
} from '../../utils/test-utils';

describe('snapsSlice', () => {
  describe('setSnaps', () => {
    it('sets the Snaps', () => {
      const state = snapsSlice.reducer(
        snapsSlice.getInitialState(),
        setSnaps([getMockSnap().snap]),
      );

      expect(state).toStrictEqual({
        snaps: [getMockSnap().snap],
      });
    });
  });

  describe('getSnaps', () => {
    it('selects the snaps', () => {
      const state = getMockState({
        snaps: {
          snaps: [getMockSnap().snap],
        },
      });

      expect(getSnaps(state)).toStrictEqual([getMockSnap().snap]);
    });
  });

  describe('getUpdateAvailable', () => {
    it('returns `false` if the snap is not installed', () => {
      const state = getMockState({
        snaps: {
          snaps: [getMockSnap().snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({}),
          },
        },
      });

      expect(getUpdateAvailable('snap-id')(state)).toBe(false);
    });

    it('returns `false` if the snap is installed but not in the store', () => {
      const state = getMockState({
        snaps: {
          snaps: [],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              'snap-id': {
                version: '1.0.0',
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable('snap-id')(state)).toBe(false);
    });

    it('returns `false` if the snap is installed but the version is the same', () => {
      const { snap } = getMockSnap();
      const state = getMockState({
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: snap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable(snap.snapId)(state)).toBe(false);
    });

    it('returns `false` if the snap is installed and the latest version is lower', () => {
      const { snap } = getMockSnap({ latestVersion: '1.0.0' });
      const state = getMockState({
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: '1.1.0',
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable(snap.snapId)(state)).toBe(false);
    });

    it('returns `true` if the snap is installed and the latest version is higher', () => {
      const { snap } = getMockSnap({ latestVersion: '1.1.0' });
      const state = getMockState({
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: '1.0.0',
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable(snap.snapId)(state)).toBe(true);
    });
  });

  describe('getUpdatableSnaps', () => {
    it('returns all Snaps that have an update available', () => {
      const fooSnap = getMockSnap({ snapId: 'foo-snap' }).snap;
      const barSnap = getMockSnap({ snapId: 'bar-snap' }).snap;

      const state = getMockState({
        snaps: {
          snaps: [fooSnap, barSnap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [barSnap.snapId]: {
                version: '0.1.0',
              },
            }),
          },
        },
      });

      expect(getUpdatableSnaps(state)).toStrictEqual([barSnap]);
    });
  });

  describe('getSnapByVersion', () => {
    it('returns the Snap with the given checksum for one of its versions', () => {
      const fooSnap = getMockSnap({
        snapId: 'foo-snap',
        versions: [
          { version: '1.0.0', checksum: 'foo1' },
          { version: '2.0.0', checksum: 'foo2' },
        ],
      }).snap;
      const barSnap = getMockSnap({
        snapId: 'bar-snap',
        versions: [
          { version: '1.0.0', checksum: 'bar1' },
          { version: '2.0.0', checksum: 'bar2' },
        ],
      }).snap;

      const state = getMockState({
        snaps: {
          snaps: [fooSnap, barSnap],
        },
      });

      expect(getSnapByChecksum('foo1')(state)).toStrictEqual(fooSnap);
    });
  });

  it('returns undefined if no Snap with the given checksum for one of its versions is foound', () => {
    const fooSnap = getMockSnap({
      snapId: 'foo-snap',
      versions: [
        { version: '1.0.0', checksum: 'foo1' },
        { version: '2.0.0', checksum: 'foo2' },
      ],
    }).snap;
    const barSnap = getMockSnap({
      snapId: 'bar-snap',
      versions: [
        { version: '1.0.0', checksum: 'bar1' },
        { version: '2.0.0', checksum: 'bar2' },
      ],
    }).snap;

    const state = getMockState({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    expect(getSnapByChecksum('baz')(state)).toBeUndefined();
  });

  it("returns undefined if there isn't snap in the store", () => {
    const state = getMockState({
      snaps: {
        snaps: [],
      },
    });

    expect(getSnapByChecksum('foo')(state)).toBeUndefined();
  });
});

describe('auditorsSlice reducers', () => {
  it('should handle fetchAuditors.fulfilled correctly', () => {
    const initialState = { auditors: null };
    const action = {
      type: fetchAuditors.fulfilled.type,
      payload: [
        { name: 'Auditor1', address: '0x123' },
        { name: 'Auditor2', address: '0x456' },
      ],
    };
    const newState = auditorsSlice.reducer(initialState, action);
    expect(newState.auditors).toStrictEqual([
      { name: 'Auditor1', address: '0x123' },
      { name: 'Auditor2', address: '0x456' },
    ]);
  });
});

describe('getAuditorAddressesByNames selector', () => {
  it('should return an empty array if auditors data is null', () => {
    const applicationState = mock<ApplicationState>();
    applicationState.auditors = { auditors: null };
    const result = getAuditorAddressesByNames(['Auditor1'])(applicationState);
    expect(result).toStrictEqual([]);
  });

  it('should return auditor addresses for given names', () => {
    const applicationState = mock<ApplicationState>();
    applicationState.auditors = {
      auditors: [
        { name: 'Auditor1', address: '0x123' },
        { name: 'Auditor2', address: '0x456' },
      ],
    };
    const result = getAuditorAddressesByNames(['Auditor1', 'Auditor2'])(
      applicationState,
    );
    expect(result).toStrictEqual(['0x123', '0x456']);
  });
});
