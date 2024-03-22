import type { Hex } from '@metamask/utils';
import { getAddress } from 'viem';

export const parseAddress = (address: Hex): Hex | null => {
  try {
    return getAddress(address);
  } catch {
    return null;
  }
};

export const truncateAddress = (address?: string) =>
  address
    ? `${address.slice(0, 6)}••••${address.slice(
        address.length - 4,
        address.length,
      )}`
    : '';
