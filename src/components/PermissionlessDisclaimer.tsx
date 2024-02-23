import { Box, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

export const PermissionlessDisclaimer: FunctionComponent = () => (
  <Box
    width="100%"
    bg="info.muted"
    padding="3"
    color="info.default"
    textAlign="center"
  >
    <Trans>
      Experimental site for testing only. Official Snaps Directory:{' '}
      <Link href="https://snaps.metamask.io">snaps.metamask.io</Link>
    </Trans>
  </Box>
);
