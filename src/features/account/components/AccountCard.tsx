import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';
import { type Hex } from 'viem';
import { mainnet, useEnsName } from 'wagmi';

import type { AccountTrustScore } from './AccountRoleTags';
import { AccountRoleTags } from './AccountRoleTags';
import { Card, JazzIcon } from '../../../components';
import { useSelector } from '../../../hooks';
import { trimAddress } from '../../../utils';
import { isAuditor, isBuilder } from '../../snaps/store';

export type AccountCardProps = {
  accountId: string;
  trustScore?: AccountTrustScore;
  snapName?: string;
  onClick?: () => void;
};

export const AccountCard: FunctionComponent<AccountCardProps> = ({
  accountId,
  trustScore,
  snapName,
  onClick = () => undefined,
}) => {
  const address = (
    accountId.startsWith('0x') ? accountId : accountId.split(':')[4]
  ) as Hex;
  const isAuditorUser = useSelector(isAuditor(address));
  const isBuilderUser = useSelector(isBuilder(address));
  const { data } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const shortAddress = trimAddress(address);
  const title = `${data ?? shortAddress}${snapName ? ` [${snapName}]` : ``}`;
  return (
    <Link to={`/account/?address=${address}`} onClick={onClick}>
      <Card
        padding="2"
        _hover={{
          background: 'background.default-hover',
          '& button': {
            background: 'info.default',
            color: 'white',
          },
          '& .card-image': {
            filter: 'blur(60px) contrast(0.9) saturate(1.3)',
            transform: 'scale(1.3)',
          },
        }}
      >
        <Flex height="3rem" flexDirection="row" alignItems={'center'} gap="2">
          <JazzIcon address={address} size={44} />
          <Box overflow="hidden">
            <Text fontWeight="medium" isTruncated={true}>
              {title}
            </Text>
            <Text color="text.alternative" fontSize="xs" isTruncated={true}>
              {shortAddress}
            </Text>
          </Box>
          <Spacer />
          <Button variant="small">
            <Trans>View</Trans>
          </Button>
        </Flex>
      </Card>
      {trustScore && (
        <AccountRoleTags
          trustScores={[trustScore]}
          isAuditor={isAuditorUser}
          isBuilder={isBuilderUser}
        />
      )}
    </Link>
  );
};
