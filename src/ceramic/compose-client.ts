import { CeramicClient } from '@ceramicnetwork/http-client';
import { ComposeClient } from '@composedb/client';
import type { RuntimeCompositeDefinition } from '@composedb/types';
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum';
import { DIDSession } from 'did-session';

import json from './composite.compiled.json';

const CeramicNodeURL =
  'https://jsceramic-main-dev.spd.web3factory.consensys.net/';

/**
 * Creates the Compose Client.
 * @param ethProvider - The wallet provider.
 * @param account - The issuer account.
 */
export async function createComposeClient(ethProvider: any, account: string) {
  const accountId = await getAccountId(ethProvider, account);
  const authMethod = await EthereumWebAuth.getAuthMethod(
    ethProvider,
    accountId,
  );

  const composeClient = new ComposeClient({
    ceramic: new CeramicClient(CeramicNodeURL),
    definition: json as RuntimeCompositeDefinition,
  });

  const session = await DIDSession.get(accountId, authMethod, {
    resources: composeClient.resources,
  });
  composeClient.setDID(session.did);
  return composeClient;
}
