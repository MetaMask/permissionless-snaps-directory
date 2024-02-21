import { Container, Flex, Divider, Heading, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Snaps } from '../features';

const CommunityPage: FunctionComponent = () => {
  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <Flex
        width="100%"
        marginBottom="8"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" fontSize="2xl">
          <Trans>Top Community Developers</Trans>
        </Heading>
        <Link
          onClick={() => {
            console.log('remove it');
          }}
          variant="landing"
        >
          <Trans>See All Developers</Trans>
        </Link>
      </Flex>

      <Snaps />
      <Divider my="8" />
    </Container>
  );
};

export default CommunityPage;
