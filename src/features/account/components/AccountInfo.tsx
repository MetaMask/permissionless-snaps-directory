import { CircularProgress, Heading, HStack, VStack } from '@chakra-ui/react';
import type { Hex } from '@metamask/utils';
import { mainnet } from '@wagmi/core/chains';
import type { FunctionComponent } from 'react';
import { useAccount, useEnsName } from 'wagmi';

import { AccountRoleTags } from './AccountRoleTags';
import { MoreOptionMenu } from '..';
import { ConnectedNodes } from '../../../components';
import { useSelector } from '../../../hooks';
import { trimAddress } from '../../../utils';
import { getAccountConnectedNodes } from '../connections/store';
import { getAccountTrustScoreForAccountId } from '../trust-score/store';

export type AccountInfoProps = {
  address: Hex;
};

export const AccountInfo: FunctionComponent<AccountInfoProps> = ({
  address,
}) => {
  const { data, isLoading } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { isConnected } = useAccount();
  const trustScores = useSelector(getAccountTrustScoreForAccountId(address));
  const connectedNodes = useSelector(getAccountConnectedNodes(address));

  return (
    <VStack spacing="8" data-testid="account-info">
      <ConnectedNodes data={connectedNodes}></ConnectedNodes>
      {trustScores.length > 0 && <AccountRoleTags trustScores={trustScores} />}
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
            {/* Hidden for now */}
            {/* <AddToUserCircleModal subjectAddress={address} /> */}
          </>
        )}
      </HStack>
    </VStack>
  );
};
