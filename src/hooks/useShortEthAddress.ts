import { useCallback } from 'react';
import { isAddress } from 'viem';

/**
 * A hook to truncate an Ethereum address to a short version.
 *
 * @param address - The address to truncate.
 * @returns The truncated address.
 */
export function useShortEthAddress(address: string) {
  const truncateEthAddress = useCallback(() => {
    // TODO check if address is ens name (ends with .eth)
    if (address.includes('.eth')) {
      return address;
    }

    // check if the address is valid
    if (!isAddress(address)) {
      return 'Invalid address';
    }
    // get the first and last four characters
    const firstFour = address.slice(0, 6);
    const lastFour = address.slice(-4);
    // return the truncated address with ellipsis in between
    return `${firstFour}...${lastFour}`;
  }, [address]);
  // check if the address is valid

  // return the truncated address with ellipsis in between
  return truncateEthAddress();
}
