import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { getAllUsers } from './store';
import { useSelector } from '../../hooks';
import { AccountCardShort } from '../account';

export const UsersList: FunctionComponent = () => {
  const users = useSelector(getAllUsers());

  const renderAccountGridRow = (accounts: { id: string }[], title: string) => {
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
          {accounts.map((account, index) => (
            <AccountCardShort
              key={`${account.id}-${index}`}
              accountId={account.id}
            ></AccountCardShort>
          ))}
          <Box
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

  return <>{renderAccountGridRow(users, t`Explore community`)}</>;
};
