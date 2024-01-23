import { CircularProgress, HStack, Heading, VStack } from '@chakra-ui/react';
import type { Hex } from '@metamask/utils';
import type { FunctionComponent } from 'react';
import { useAccount, useEnsName } from 'wagmi';

import { AccountRole, AccountRoleTags } from './AccountRoleTags';
import { AddToUserCircleModal } from './modals';
import { MoreOptionMenu } from '..';
import { JazzIcon } from '../../../components';
import { trimAddress } from '../../../utils';

export type AccountInfoProps = {
  address: Hex;
};

export const AccountInfo: FunctionComponent<AccountInfoProps> = ({
  address,
}) => {
  const { data, isLoading } = useEnsName({
    address,
  });
  const { isConnected } = useAccount();

  return (
    <VStack spacing="8" data-testid="account-info">
      <JazzIcon address={address} size={130} />
      <HStack>
        <Heading
          as="h3"
          fontSize="3xl"
          color="text.alternative"
          textAlign="center"
        >
          {isLoading ? (
            <CircularProgress value={80} data-testid="account-info-loading" />
          ) : (
            data ?? trimAddress(address)
          )}
        </Heading>
        {isConnected && (
          <>
            <MoreOptionMenu subjectAddress={address} />
            <AddToUserCircleModal subjectAddress={address} />
          </>
        )}
      </HStack>
      <AccountRoleTags
        roles={[
          AccountRole.Developer,
          AccountRole.Auditor,
          AccountRole.Reviewer,
        ]}
      />
    </VStack>
  );
};
