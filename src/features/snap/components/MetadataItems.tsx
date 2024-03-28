import { Link } from 'gatsby';
import { t } from '@lingui/macro';
import { navigate } from 'gatsby';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';
import { mainnet, useEnsName } from 'wagmi';

import { Data } from './Data';
import { trimAddress } from '../../../utils';

export type MetadataItemsProps = {
  address: Hex;
};

export const MetadataItems: FunctionComponent<MetadataItemsProps> = ({
  address,
}) => {
  const { data } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return (
    <>
      {address && (
        <Data
          label={t`Developer`}
          value={
            <Link to={`/account/?address=${address}`}>
          }
        />
      )}
    </>
  );
};
