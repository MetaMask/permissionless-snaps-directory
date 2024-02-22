import type { Address } from '@wagmi/core';
import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';
import { isAddress } from 'viem';
import { getEnsAddress } from 'viem/actions';
import { normalize } from 'viem/ens';

import { WAGMI_CONFIG } from '../config/wagmi-config';
import type { Snap } from '../features';

/**
 * Get the search results for the given query. This will return the search
 * results for the given query, debounced by 300 milliseconds.
 *
 * @param query - The query to search for.
 * @returns The search results.
 */
export function useSearchResults(query: string) {
  const { fusejs } = useStaticQuery<{ fusejs: Queries.fusejs }>(graphql`
    query {
      fusejs {
        index
        data
      }
    }
  `);

  const [resolvedAddress, setResolvedAddress] = useState<Address | null>();
  const results = useGatsbyPluginFusejs<Snap>(query, fusejs, {
    threshold: 0.3,
    distance: 300,
  });

  useEffect(() => {
    if (query.endsWith('.eth')) {
      getEnsAddress(WAGMI_CONFIG.getPublicClient(), {
        name: normalize(query),
      })
        .then((address) => {
          setResolvedAddress(address);
        })
        .catch(() => {
          setResolvedAddress(null);
        });
    }
  }, [query]);

  if (isAddress(query)) {
    return { users: [{ address: query }], snaps: [] };
  } else if (resolvedAddress) {
    return { users: [{ address: resolvedAddress }], snaps: [] };
  }

  return { users: [], snaps: results.map(({ item }) => item) };
}
