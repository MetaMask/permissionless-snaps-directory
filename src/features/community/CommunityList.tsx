import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { AccountCardShort } from './components';
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

  const renderAccountGridRow = (
    accounts: { accountId: string }[],
    title: string,
  ) => {
    return (
      <>
        <Heading as="h2" fontSize="2xl" marginBottom={8}>
          <Trans>{title}</Trans>
        </Heading>
        <SimpleGrid
          columns={[1, null, 2, 9]}
          spacing="1rem"
          style={{ position: 'relative' }}
        >
          {accounts.map((auditor, index) => (
            <AccountCardShort
              key={`${auditor.accountId}-${index}`}
              accountId={auditor.accountId}
            ></AccountCardShort>
          ))}
          <Box
            bg="gradient.row"
            position="absolute"
            top="0"
            left="calc(6 * (100% / 9))"
            width="calc(3 * (105% / 9))"
            height="100%"
            pointerEvents="none"
          />
        </SimpleGrid>
      </>
    );
  };

  return (
    <>
      {renderAccountGridRow(topAuthors, t`Top Builders`)}
      <Divider mt="3rem" mb="2rem" />
      {renderAccountGridRow(topDevelopers, t`Top Community Developers`)}
      <Divider mt="3rem" mb="2rem" />
      {renderAccountGridRow(topAuditors, t`Top Community Security Reviewers`)}
    </>
  );
};
