import { Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';
import { mainnet, useEnsName } from 'wagmi';

import { Data } from './Data';
import { trimAddress } from '../../../utils';

export type MetadataAuditItemProps = {
  auditorAddresses: Hex[];
};

export const MetadataAuditItem: FunctionComponent<MetadataAuditItemProps> = ({
  auditorAddresses,
}) => {
  const auditors: any[] = [];
  for (const address of auditorAddresses) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useEnsName({
      address,
      chainId: mainnet.id,
    });
    auditors.push(data ?? trimAddress(address));
  }
  return (
    <>
      {auditors.length > 0 && (
        <Data
          label={t`Audited By`}
          value={auditors.map((auditor, index) => (
            <Link
              key={`auditor-${index}`}
              to={`/account/?address=${auditorAddresses[index]}`}
            >
              <Text color="info.default">{auditor}</Text>
            </Link>
          ))}
        />
      )}
    </>
  );
};
