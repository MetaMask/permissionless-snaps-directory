import type { FunctionComponent } from 'react';

import { MetaMaskIcon, AvatarIcon, AvatarFallbackIcon } from './icons';

export type ConnectButtonAvatarProps = {
  isConnected: boolean;
  isFallback: boolean;
};

export const ConnectButtonAvatar: FunctionComponent<
  ConnectButtonAvatarProps
> = ({ isConnected, isFallback }) => {
  const width = { base: '0', sm: '1.3rem' };

  if (isConnected) {
    if (isFallback) {
      return (
        <AvatarFallbackIcon
          width={width}
          data-testid="connect-btn-avatar-connected-fallabck"
        />
      );
    }
    return (
      <AvatarIcon width={width} data-testid="connect-btn-avatar-connected" />
    );
  }
  return <MetaMaskIcon width={width} data-testid="connect-btn-avatar" />;
};
