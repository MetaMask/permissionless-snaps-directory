import { Box, Divider, Heading } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import { ActivityItem } from './ActivityItem';
import { useSelector, useVerifiableCredential } from '../../../../hooks';
import { getIssuedAssertionsForIssuerId } from '../../assertions/store';

export type ActivitySectionProps = {
  address: Address;
};

export const ActivitySection: FunctionComponent<ActivitySectionProps> = ({
  address,
}) => {
  const { accountVCBuilder } = useVerifiableCredential();
  const pkhAddress = useMemo(
    () => accountVCBuilder.getSubjectDid(address),
    [accountVCBuilder, address],
  );
  const assertions = useSelector(getIssuedAssertionsForIssuerId(pkhAddress));

  if (assertions && assertions.length !== 0) {
    return (
      <>
        <Divider mt="3rem" mb="2rem" />
        <Heading as="h2" fontSize="2xl" mb="2rem">
          {t`Activity`}
        </Heading>
        <Box data-testid="activity-section">
          {assertions.map((assertion, index) => (
            <ActivityItem
              key={`${assertion.accountId}-${index}`}
              assertion={assertion}
            />
          ))}
        </Box>
      </>
    );
  }

  return null;
};
