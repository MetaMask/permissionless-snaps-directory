import type { BoxProps } from '@chakra-ui/react';
import { Box, Container, Stack } from '@chakra-ui/react';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { ColorModeToggle } from './ColorModeToggle';
import { CommunityButton } from './CommunityButton';
import { ConnectButton } from './ConnectButton';
import { Logo } from './Logo';
import { PermissionlessDisclaimer } from './PermissionlessDisclaimer';
import { FilterSearch, Notifications } from '../features';

type HeaderProps = BoxProps;

export const Header: FunctionComponent<HeaderProps> = (props) => (
  <Box
    {...props}
    as="header"
    background="background.header"
    backdropFilter="auto"
    backdropBlur="1.25rem"
    backdropSaturate="180%"
    position="fixed"
    top="0"
    left="0"
    width="100%"
    zIndex="sticky"
  >
    <PermissionlessDisclaimer />
    <Container maxWidth="7xl">
      <Stack
        direction="row"
        alignItems="center"
        gap="3"
        justifyContent="space-between"
      >
        <Link to="/">
          <Stack direction="row" alignItems="center" gap="2">
            <Logo />
          </Stack>
        </Link>
        <Stack direction="row" gap="2">
          <FilterSearch />
          <ColorModeToggle />
          <Notifications />
          <CommunityButton />
          <ConnectButton />
        </Stack>
      </Stack>
    </Container>
  </Box>
);
