import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { ConnectButtonAvatar } from './ConnectButtonAvatar';

export type ConnectButtonInnerProps = {
  handleOnClick?: (() => void) | undefined;
  isConnected: boolean;
  ensName?: string | undefined;
  truncatedAddress?: string | undefined;
};

export const ConnectButtonInner: FunctionComponent<ConnectButtonInnerProps> = ({
  handleOnClick,
  isConnected,
  ensName,
  truncatedAddress,
}) => {
  return (
    <Button
      variant={isConnected ? 'connected' : 'connect'}
      leftIcon={<ConnectButtonAvatar isConnected={isConnected} />}
      iconSpacing={isConnected ? '0' : '2'} // TODO: Add Space for Avatar Icon if Avatar Icon is ready
      onClick={handleOnClick}
    >
      {isConnected ? ensName ?? truncatedAddress : <Trans>Connect</Trans>}
    </Button>
  );
};
