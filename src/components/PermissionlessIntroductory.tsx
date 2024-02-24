import {
  Box,
  Link,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { DangerIcon } from './icons';

export const PermissionlessIntroductory: FunctionComponent = () => (
  <Box bg="background.alternative" padding="6" mb="8" mt="8" borderRadius="xl">
    <Heading as="h2" fontSize="3xl" mb="8">
      <Flex>
        <DangerIcon width="12" mt="-1" mr="2" />
        <Trans>
          We&apos;re experimenting with a community reputation system for Snaps
        </Trans>
      </Flex>
    </Heading>

    <Flex flexDirection="column" gap="4" textAlign="left">
      <Text>
        <Trans>
          Launching Snaps is our first milestone towards permissionless
          innovation. Making Snaps distribution permissionless is our next step
          towards opening up MetaMask as a platform for developers and the
          community.
        </Trans>
      </Text>

      <Text>
        <Trans>
          We want to enable a decentralized App Store for MetaMask Snaps. We
          envision a community of Snaps users, developers, auditors, and
          security experts safeguarding Snaps based on collective community
          wisdom and sentiment, instead of centralized gate-keeping.
        </Trans>
      </Text>

      <Text>
        <Trans>
          We are launching this prototype to test some features of a
          decentralized trust and reputation system for Snaps.
        </Trans>
      </Text>

      <UnorderedList>
        <ListItem>
          <Trans>
            Users can issue explicit trust or distrust attestations to each
            other and Snaps
          </Trans>
        </ListItem>
        <ListItem>
          <Trans>
            These attestations create a{' '}
            <Link href="https://explorer-graph.web.app/" target="_blank">
              reputation graph
            </Link>{' '}
            for Users and Snaps
          </Trans>
        </ListItem>
        <ListItem>
          <Trans>
            Snaps and Users build reputation as a result of compute (EigenTrust)
            on this reputation graph. This compute is verifiable and
            configurable by the community.
          </Trans>
        </ListItem>
        <ListItem>
          <Trans>
            This community ranking system can be used to identify safe and
            malicious snaps.
          </Trans>
        </ListItem>
      </UnorderedList>

      <Text>
        <Trans>
          You can read a detailed User Guide for this prototype{' '}
          <Link href="spd-experimentation-user-guide.pdf" target="_blank">
            here
          </Link>
          .
        </Trans>
      </Text>

      <Text>
        <Trans>
          Do share your feedback{' '}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSekp2NT0zl8gttU-TeY_VI6Qo66GnLjLfUEYMh1flkL7z_faA/viewform?usp=sf_link"
            target="_blank"
          >
            in this form
          </Link>
          , and join this{' '}
          <Link href="https://t.me/+tzukbymkkjU5NGRk" target="_blank">
            telegram group
          </Link>{' '}
          for questions and support.
        </Trans>
      </Text>
    </Flex>
  </Box>
);
