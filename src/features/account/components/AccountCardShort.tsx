import { Flex, Text, Box, Button, HStack } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';
import { type Hex } from 'viem';
import { mainnet, useEnsName } from 'wagmi';

import { JazzIcon } from '../../../components';
import { trimAddress } from '../../../utils';

export type AccountCardShortProps = {
  accountId: string;
  onClick?: () => void;
};

export const AccountCardShort: FunctionComponent<AccountCardShortProps> = ({
  accountId,
}) => {
  const address = (
    accountId.startsWith('0x') ? accountId : accountId.split(':')[4]
  ) as Hex;
  const { data } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const shortAddress = trimAddress(address);
  const title = `${data ?? shortAddress}`;
  return (
    <Link to={`/account/?address=${address}`}>
      <Box
        width="8rem"
        height="11.125rem"
        padding="0.5rem"
        borderRadius="0.5rem"
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
        <Flex
          flexDirection="column"
          alignItems={'center'}
          textAlign={'center'}
          gap="1rem"
        >
          <HStack marginBottom={-1.5}>
            <JazzIcon address={address} size={80} />
          </HStack>
          <Text fontWeight={400} isTruncated={true} width={'7rem'}>
            {title}
          </Text>
          <Button variant="small">
            <Trans>View</Trans>
          </Button>
        </Flex>
      </Box>
    </Link>
  );
};
