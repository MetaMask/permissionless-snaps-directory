import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';

import { Data } from './Data';
import { EntityName } from '../../../components/EntityName';

export type MetadataItemsProps = {
  address: Hex;
};

export const MetadataItems: FunctionComponent<MetadataItemsProps> = ({
  address,
}) => {
  return (
    <>
      {address && (
        <Data
          label={t`Developer`}
          value={
            <EntityName subject={`did:pkh:eip155:1:${address}`}></EntityName>
          }
        />
      )}
    </>
  );
};
