import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import type { Address } from 'viem';

import { Data } from './Data';
import { EntityName } from '../../../components/EntityName';

export type MetadataItemProps = {
  address: Address;
};

export const MetadataItem: FunctionComponent<MetadataItemProps> = ({
  address,
}) => {
  return (
    <Data
      label={t`Developer`}
      value={<EntityName subject={address} isSnap={false} noMargin={true} />}
    />
  );
};
