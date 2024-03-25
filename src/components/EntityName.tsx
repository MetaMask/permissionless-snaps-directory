import { Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useCallback, useMemo } from 'react';
import { useEnsName } from 'wagmi';

import { getSnapByChecksum } from '../features';
import { useSelector, useVerifiableCredential } from '../hooks';
import { trimAddress } from '../utils';

export type ActivitySubjectProps = {
  subject: string;
  title?: string;
};

export const EntityName: FunctionComponent<ActivitySubjectProps> = ({
  subject,
  title,
}) => {
  const { accountVCBuilder, snapVCBuilder } = useVerifiableCredential();

  const isSnap = useMemo(() => subject.startsWith('snap://'), [subject]);
  const snapVersionId = useMemo(
    () => snapVCBuilder.getSnapIdFromDid(subject),
    [snapVCBuilder, subject],
  );
  const snap = useSelector(getSnapByChecksum(snapVersionId ?? ''));

  const attestedSubject = useMemo(() => {
    if (isSnap) {
      return snapVCBuilder.getSnapIdFromDid(subject);
    }

    return accountVCBuilder.getAddressFromDid(subject);
  }, [isSnap, subject, snapVCBuilder, accountVCBuilder]);

  const { data } = useEnsName({
    address: attestedSubject as Address,
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

    return attestedSubject ? trimAddress(attestedSubject) : t`Unknown`;
  }, [title, isSnap, data, attestedSubject, snap?.name]);

  const buildLink = useCallback(() => {
    return isSnap
      ? `${snap?.gatsbyPath}`
      : `/account/?address=${attestedSubject}`;
  }, [isSnap, snap, attestedSubject]);

  return (
    <Link to={buildLink()}>
      <Text color="info.default" ml={-1} mr={-1}>
        {displaySubject()}
      </Text>
    </Link>
  );
};
