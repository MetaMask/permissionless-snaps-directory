import { Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { AccountCard } from './components';
import { getTopSoftwareAuditors, getTopSoftwareDevelopers } from './store';
import { useSelector } from '../../hooks';

export const CommunityList: FunctionComponent = () => {
  const topDevelopers = useSelector(getTopSoftwareDevelopers(9));
  const topAuditors = useSelector(getTopSoftwareAuditors(9));

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
            accountRole={developer.trustScoreScope}
            profilePath=""
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
            accountRole={auditor.trustScoreScope}
            profilePath=""
          ></AccountCard>
        ))}
      </SimpleGrid>
    </>
  );
};
