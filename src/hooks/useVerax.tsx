import { VeraxSdk } from '@verax-attestation-registry/verax-sdk';
import type { Address } from '@wagmi/core';
import type { Hex } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';

import { WAGMI_CONFIG } from '../config/wagmi-config';

export const useVerax = (address: Address) => {
  return async (
    schemaId: string,
    payload: object[],
    subject: Hex,
    expirationDate: number,
  ) => {
    const veraxSdk = new VeraxSdk(
      VeraxSdk.DEFAULT_LINEA_SEPOLIA_FRONTEND,
      address,
    );

    const portalId = '0xAa39e84209dc569A51De7DE629bd10710519057C';

    if (address && veraxSdk) {
      try {
        await veraxSdk.schema.findBy();
        let receipt = await veraxSdk.portal.attest(
          portalId,
          {
            schemaId,
            expirationDate,
            subject,
            attestationData: payload,
          },
          [],
          false,
        );
        if (receipt.transactionHash) {
          console.log(`Transaction hash = ${receipt.transactionHash}`);
          receipt = await waitForTransactionReceipt(WAGMI_CONFIG.publicClient, {
            hash: receipt.transactionHash,
          });
          console.log(`Attestation ID = ${receipt.logs?.[0]?.topics[1]}`);
        } else {
          console.error(`Oops, something went wrong!`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Oops, something went wrong: ${error.message}`);
        }
      }
    }
  };
};
