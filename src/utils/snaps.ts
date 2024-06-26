import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { SemVerVersion } from '@metamask/utils';
import semver from 'semver/preload';

import type { PermissionlessSnapsRegistryDatabase } from '../types/snaps-registry';

export type DeepFields<Type> = Type extends Record<string, unknown>
  ? Fields<Type, keyof Type>
  : Type;

export type Fields<Query, Name extends keyof Query> = {
  [Key in Name]: Query[Key] extends Queries.Maybe<infer Inner>
    ? DeepFields<Inner>
    : never;
};

/**
 * Check if the current provider supports snaps by calling `wallet_getSnaps`.
 *
 * @param provider - The provider to use to check for snaps support. Defaults to
 * `window.ethereum`.
 * @returns True if the provider supports snaps, false otherwise.
 */
export async function hasSnapsSupport(
  provider: MetaMaskInpageProvider = window.ethereum,
) {
  try {
    await provider.request({
      method: 'wallet_getSnaps',
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Check if the current provider is MetaMask by calling `web3_clientVersion`.
 *
 * @param provider - The provider to use to check for MetaMask. Defaults to
 * `window.ethereum`.
 * @returns True if the provider is MetaMask, false otherwise.
 */
export async function isMetaMaskProvider(
  provider: MetaMaskInpageProvider = window.ethereum,
) {
  try {
    const result = await provider.request<string>({
      method: 'web3_clientVersion',
    });

    return result?.toLowerCase().includes('metamask');
  } catch {
    return false;
  }
}

/**
 * Get a MetaMask provider. This will loop through all the detected providers
 * and return the first one that is MetaMask.
 */
export async function getMetaMaskProvider() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (await isMetaMaskProvider()) {
    return window.ethereum;
  }

  if (window.ethereum?.detected) {
    for (const provider of window.ethereum.detected) {
      if (await isMetaMaskProvider(provider)) {
        return provider;
      }
    }
  }

  if (window.ethereum?.providers) {
    for (const provider of window.ethereum.providers) {
      if (await isMetaMaskProvider(provider)) {
        return provider;
      }
    }
  }

  return null;
}

/**
 * Get a provider that supports snaps. This will loop through all the detected
 * providers and return the first one that supports snaps.
 *
 * @returns The provider, or `null` if no provider supports snaps.
 */
export async function getSnapsProvider() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (await hasSnapsSupport()) {
    return window.ethereum;
  }

  if (window.ethereum?.detected) {
    for (const provider of window.ethereum.detected) {
      if (await hasSnapsSupport(provider)) {
        return provider;
      }
    }
  }

  if (window.ethereum?.providers) {
    for (const provider of window.ethereum.providers) {
      if (await hasSnapsSupport(provider)) {
        return provider;
      }
    }
  }

  return null;
}

export type VerifiedSnap =
  PermissionlessSnapsRegistryDatabase['verifiedSnaps'][string];

/**
 * Get the latest version of the given Snap.
 *
 * @param snap - The Snap to get the latest version for.
 * @returns The latest version of the Snap.
 */
export function getLatestSnapVersion(snap: VerifiedSnap) {
  const [latest] = Object.keys(snap.versions).sort((a, b) => {
    return semver.compare(b, a);
  });

  // This should never happen. The validation in the registry ensures that
  // there is always at least one version.
  if (!latest) {
    throw new Error(`No latest version found for Snap: ${snap.id}.`);
  }

  return latest;
}

/**
 * Get all the versions of the given Snap.
 *
 * @param snap - The Snap to get the versions for.
 * @returns The versions of the Snap.
 */
export function getAllSnapVersions(snap: VerifiedSnap) {
  // This should never happen. The validation in the registry ensures that
  // there is always at least one version.
  if (!snap.versions || Object.keys(snap.versions).length === 0) {
    throw new Error(`No version found for Snap: ${snap.id}.`);
  }

  return Object.keys(snap.versions)
    .map((version) => {
      const versionInfo = snap.versions[version as SemVerVersion];
      return versionInfo
        ? {
            version,
            checksum: versionInfo.checksum,
          }
        : undefined;
    })
    .filter(Boolean);
}

/**
 * Get checksum of the latest version of the given Snap.
 *
 * @param snap - The Snap to get the latest version for.
 * @param latestVersion - The latest version of the Snap.
 * @returns The checksum value of latest version of the Snap.
 * @throws If the latest version doesn't exist in the Snap.
 */
export function getLatestSnapVersionChecksum(
  snap: VerifiedSnap,
  latestVersion: string,
) {
  const { versions } = snap;

  if (!versions[latestVersion]) {
    throw new Error(
      `Snap:${snap.id} version data does not exist for the version ${latestVersion}`,
    );
  }
  return versions[latestVersion].checksum;
}
