import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';

import { Data } from './Data';
import { EntityName } from '../../../components/EntityName';
import { useVerifiableCredential } from '../../../hooks';

export type MetadataItemProps = {
  address: Hex;
};

export const MetadataItem: FunctionComponent<MetadataItemProps> = ({
  address,
}) => {
  const { accountVCBuilder } = useVerifiableCredential();
  return (
    <>
      {address && (
        <Data
          label={t`Developer`}
          value={
            <EntityName subject={accountVCBuilder.getSubjectDid(address)} />
          }
        />
      )}
    </>
  );
};
