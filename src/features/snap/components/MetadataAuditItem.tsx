import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';

import { Data } from './Data';
import { EntityName } from '../../../components/EntityName';
import { useVerifiableCredential } from '../../../hooks';

export type MetadataAuditItemProps = {
  auditorAddresses: Hex[];
};

export const MetadataAuditItem: FunctionComponent<MetadataAuditItemProps> = ({
  auditorAddresses,
}) => {
  const { accountVCBuilder } = useVerifiableCredential();
  return (
    <>
      {auditorAddresses.length > 0 && (
        <Data
          label={t`Audited By`}
          value={auditorAddresses.map((auditorAddress, index) => (
            <EntityName
              key={`${auditorAddress}-${index}`}
              subject={accountVCBuilder.getSubjectDid(auditorAddress)}
            />
          ))}
        />
      )}
    </>
  );
};
