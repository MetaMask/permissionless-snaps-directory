import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { Card, JazzIcon } from '../../../components';

export type AccountCardProps = {
  accountId: string;
  accountRole: string;
  profilePath: string;
  onClick?: () => void;
};

export const AccountCard: FunctionComponent<AccountCardProps> = ({
  accountId,
  accountRole,
  profilePath,
  onClick = () => undefined,
}) => {
  return (
    <Link to={profilePath} onClick={onClick}>
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
        {/* <AccountProfileBanner /> */}
        <Flex
          height="3rem"
          flexDirection="row"
          justifyContent="space-between"
          gap="2"
        >
          <Flex
            alignItems="center"
            width={{ base: '100%', md: 'auto' }}
            height="fit-content"
            gap="2"
            overflow="hidden"
          >
            <JazzIcon address={accountId} size={44} />
            <Box overflow="hidden">
              <Text fontWeight="medium" isTruncated={true}>
                {accountId}
              </Text>
              <Text color="text.alternative" fontSize="xs" isTruncated={true}>
                {accountRole}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end">
            <Button variant="small">
              <Trans>View</Trans>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
