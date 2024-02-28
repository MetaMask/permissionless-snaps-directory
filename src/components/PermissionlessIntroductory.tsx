import { Box, Link, Flex, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

export const PermissionlessIntroductory: FunctionComponent = () => (
  <Box bg="info.muted" padding="6" mb="8" mt="8" borderRadius="xl">
    <Text
      fontWeight="700"
      fontSize="2rem"
      mb="0.625rem"
      textColor="info.default"
    >
      <Flex>
        <Trans>We&apos;re experimenting</Trans>
      </Flex>
    </Text>

    <Flex flexDirection="column" gap="4" textAlign="left">
      <Text fontWeight="400">
        <Trans>
          This experimental version of the official Snaps Directory is our next milestone towards permissionless innovation. We envision a community of users, developers, and security experts safeguarding Snaps based on collective sentiment—moving away from centralized gatekeeping.{' '}
          <Link
            href="https://support.metamask.io/hc/en-us/articles/23263846792475"
            target="_blank"
          >
            Learn more
          </Link>
        </Trans>
      </Text>
    </Flex>
  </Box>
);
