import type { FunctionComponent } from 'react';
import type { Address } from 'viem';
import { mainnet, useEnsName } from 'wagmi';

export type UserNodeTooltipProps = {
  address: Address;
};

export const UserNodeTooltip: FunctionComponent<UserNodeTooltipProps> = ({
  address,
}) => {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return (
    <div>
      <div>Address: {address}</div>
      {ensName && <div>ENS: {ensName}</div>}
    </div>
  );
};

export default UserNodeTooltip;
