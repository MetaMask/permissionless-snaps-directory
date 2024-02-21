import { Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { AccountCard } from './components';
import { useSelector } from '../../hooks';
import { getTopAccountsForScope } from '../account/trust-score/store';
import { TrustScoreScope } from '../account/trust-score/types';

export const CommunityList: FunctionComponent = () => {
  const topDevelopers = useSelector(
    getTopAccountsForScope(9, TrustScoreScope.SoftwareDevelopment),
  );
  const topAuditors = useSelector(
    getTopAccountsForScope(9, TrustScoreScope.SoftwareSecurity),
  );

  return (
    <>
      <Flex
        width="100%"
        marginBottom="8"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" fontSize="2xl">
          <Trans>Top Community Developers</Trans>
        </Heading>
      </Flex>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
        {topDevelopers.map((developer, index) => (
          <AccountCard
            key={`${developer.accountId}-${index}`}
            accountId={developer.accountId}
            trustScore={developer}
          ></AccountCard>
        ))}
      </SimpleGrid>
      <Divider my="8" />
      <Flex
        width="100%"
        marginBottom="8"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" fontSize="2xl">
          <Trans>Top Community Security Reviewers</Trans>
        </Heading>
      </Flex>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
        {topAuditors.map((auditor, index) => (
          <AccountCard
            key={`${auditor.accountId}-${index}`}
            accountId={auditor.accountId}
            trustScore={auditor}
          ></AccountCard>
        ))}
      </SimpleGrid>
    </>
  );
};
