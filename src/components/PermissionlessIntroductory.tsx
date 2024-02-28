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
          Snaps have transformed MetaMask into an execution platform, allowing
          it to be extended by the community. This experiment is a pivotal step
          towards permissionless innovation, by making Snaps distribution
          permissionless. We envision a community comprising users, developers,
          and security experts who safeguard Snaps through collective wisdom and
          sentiment, moving away from centralized gatekeeping. For more
          information, please{' '}
          <Link
            href="https://support.metamask.io/hc/en-us/articles/23263846792475"
            target="_blank"
          >
            review the user guide here.
          </Link>
        </Trans>
      </Text>
    </Flex>
  </Box>
);
