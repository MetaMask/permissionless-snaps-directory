import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';

import { Data } from './Data';
import { EntityName } from '../../../components/EntityName';
import { useVerifiableCredential } from '../../../hooks';

export type MetadataItemsProps = {
  address: Hex;
};

export const MetadataItems: FunctionComponent<MetadataItemsProps> = ({
  address,
}) => {
  const { accountVCBuilder } = useVerifiableCredential();
  return (
    <>
      {address && (
        <Data
          label={t`Developer`}
          value={
            <EntityName
              subject={accountVCBuilder.getSubjectDid(address)}
            ></EntityName>
          }
        />
      )}
    </>
  );
};
