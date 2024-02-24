import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { AccountCard } from './components';
import { useSelector } from '../../hooks';
import {
  getTopAccountsForScope,
  getTopAuthors,
} from '../account/trust-score/store';
import { TrustScoreScope } from '../account/trust-score/types';

export const CommunityList: FunctionComponent = () => {
  const topDevelopers = useSelector(
    getTopAccountsForScope(9, TrustScoreScope.SoftwareDevelopment),
  );
  const topAuditors = useSelector(
    getTopAccountsForScope(9, TrustScoreScope.SoftwareSecurity),
  );
  const topAuthors = getTopAuthors();

  return (
    <>
      <Heading as="h2" fontSize="2xl" marginBottom={8}>
        <Trans>Top Community Developers</Trans>
      </Heading>
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
      <Heading as="h2" fontSize="2xl" marginBottom={8}>
        <Trans>Top Community Security Reviewers</Trans>
      </Heading>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
        {topAuditors.map((auditor, index) => (
          <AccountCard
            key={`${auditor.accountId}-${index}`}
            accountId={auditor.accountId}
            trustScore={auditor}
          ></AccountCard>
        ))}
      </SimpleGrid>
      <Divider my="8" />
      <Heading as="h2" fontSize="2xl" mb={8}>
        <Trans>Top Community Authors</Trans>
      </Heading>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
        {topAuthors.map((authors, index) => (
          <AccountCard
            key={`${authors.accountId}-${index}`}
            accountId={authors.accountId}
            snapName={authors.snapName}
          ></AccountCard>
        ))}
      </SimpleGrid>
    </>
  );
};
