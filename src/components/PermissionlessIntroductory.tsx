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
          Launching Snaps is our first milestone towards permissionless
          innovation. We envision a community of Snaps users, developers, and
          security experts safeguarding Snaps based on collective community
          sentiment—instead of centralized gate-keeping. For more info, you can{' '}
          <Link href="spd-experimentation-user-guide.pdf" target="_blank">
            review the user guide here.
          </Link>
        </Trans>
      </Text>
    </Flex>
  </Box>
);
