import type { Hex } from '@metamask/utils';
import type { SignTypedDataArgs } from '@wagmi/core';
import type { PublicClient } from 'wagmi';

export class VerifiableCredentialService {
  client: PublicClient;

  signUtil: (
    args?: Record<string | number | symbol, unknown> | undefined,
  ) => Promise<Hex>;

  constructor(
    client: PublicClient,
    signUtil: (
      args?: Record<string | number | symbol, unknown> | undefined,
    ) => Promise<Hex>,
  ) {
    this.client = client;
    this.signUtil = signUtil;
  }

  async sign(signArg: SignTypedDataArgs): Promise<Hex> {
    return await this.signUtil(signArg);
  }

  async verify(
    address: Hex,
    signArg: SignTypedDataArgs,
    signature: Hex,
  ): Promise<boolean> {
    const { domain, types, primaryType, message } = signArg;

    return await this.client.verifyTypedData({
      address,
      domain,
      types,
      primaryType,
      message,
      signature,
    });
  }
}
