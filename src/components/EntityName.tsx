import { Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useCallback } from 'react';
import { useEnsName } from 'wagmi';

import { getSnapByChecksum } from '../features';
import { useSelector } from '../hooks';
import { trimAddress } from '../utils';

export type ActivitySubjectProps = {
  subject: string;
  isSnap: boolean;
  title?: string;
  noMargin?: boolean;
};

export const EntityName: FunctionComponent<ActivitySubjectProps> = ({
  subject,
  isSnap,
  title,
  noMargin,
}) => {
  const snap = useSelector(getSnapByChecksum(subject));

  const { data } = useEnsName({
    address: subject as Address,
    chainId: mainnet.id,
    enabled: !isSnap,
  });

  const displaySubject = useCallback(() => {
    if (title) {
      return title;
    } else if (isSnap) {
      return snap?.name ?? t`Unknown`;
    } else if (data) {
      return data;
    }

    return subject ? trimAddress(subject) : t`Unknown`;
  }, [title, isSnap, data, subject, snap?.name]);

  const buildLink = useCallback(() => {
    return isSnap ? `${snap?.gatsbyPath}` : `/account/?address=${subject}`;
  }, [isSnap, snap, subject]);

  return (
    <Link to={buildLink()}>
      <Text color="info.default" mx={noMargin ? 0 : -1}>
        {displaySubject()}
      </Text>
    </Link>
  );
};
