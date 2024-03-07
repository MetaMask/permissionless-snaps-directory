import { CircularProgress, Heading, HStack, VStack } from '@chakra-ui/react';
import type { Hex } from '@metamask/utils';
import { mainnet } from '@wagmi/core/chains';
import type { FunctionComponent } from 'react';
import { useAccount, useEnsName } from 'wagmi';

import { AccountRoleTags } from './AccountRoleTags';
import { MoreOptionMenu } from '..';
import ConnectedNodes from '../../../components/ConnectedNodes';
import { useSelector, useVerifiableCredential } from '../../../hooks';
import { trimAddress } from '../../../utils';
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

  const { accountVCBuilder } = useVerifiableCredential();

  const accountId = accountVCBuilder.getSubjectDid(address);

  const trustScores = useSelector(getAccountTrustScoreForAccountId(accountId));

  // Define your nodes and links data
  const graphData = {
    nodes: [
      {
        id: 'main',
        group: 1,
        isMain: true,
        address: '0xC63caBe93bB29c61E337a87B2E3d4D7C5F5556c0',
      }, // Main node
      {
        id: 'node1',
        group: 2,
        address: '0x690fcde0b69b8b66342ac390a82092845c6f7f1c',
      },
      {
        id: 'node2',
        group: 2,
        address: '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8',
      },
      {
        id: 'node3',
        group: 3,
        address: '0x40b38765696e3d5d8d9d834d8aad4bb6e418e489',
      },
      {
        id: 'node4',
        group: 3,
        address: '0xe92d1a43df510f82c66382592a047d288f85226f',
      },
      {
        id: 'node5',
        group: 3,
        address: '0xbeb5fc579115071764c7423a4f12edde41f106ed',
      },
      {
        id: 'node6',
        group: 3,
        address: '0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea',
      },
      // Add more nodes as needed
    ],
    links: [
      { source: 'main', target: 'node1', value: 1 },
      { source: 'main', target: 'node2', value: 1 },
      { source: 'node1', target: 'node3', value: 1 },
      { source: 'node1', target: 'node4', value: 1 },
      { source: 'node2', target: 'node5', value: 1 },
      { source: 'node2', target: 'node6', value: 1 },
      { source: 'node5', target: 'node6', value: 1 },
      // Define links between main node and other nodes
    ],
  };

  return (
    <VStack spacing="8" data-testid="account-info">
      {/* <JazzIcon address={address} size={130} /> */}
      <ConnectedNodes data={graphData}></ConnectedNodes>
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
