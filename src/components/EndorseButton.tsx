import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { UserCheckIcon, StarFilledIcon } from '.';

export type EndorseButtonProps = {
  onClick: () => void;
  endorsed: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export const EndorseButton: FunctionComponent<EndorseButtonProps> = ({
  onClick,
  endorsed,
  isDisabled = false,
  size = 'md',
}) => (
  <Button
    leftIcon={
      endorsed ? (
        <UserCheckIcon fill="#ffffff" />
      ) : (
        <StarFilledIcon fill="info.default" />
      )
    }
    variant={endorsed ? 'primaryPortable' : 'outlinePortable'}
    isDisabled={isDisabled}
    onClick={onClick}
    size={size}
  >
    {endorsed ? <Trans>Endorsed</Trans> : <Trans>Endorse</Trans>}
  </Button>
);
