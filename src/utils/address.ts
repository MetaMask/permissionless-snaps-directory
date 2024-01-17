import type { Hex } from '@metamask/utils';
import { getAddress } from 'viem';

export const parseAddress = (address: Hex): Hex | null => {
  try {
    return getAddress(address);
  } catch (error: any) {
    console.log('parse err', error);
    return null;
  }
};
