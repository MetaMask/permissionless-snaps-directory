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
        <UserCheckIcon width="1.3rem" fill="#ffffff" />
      ) : (
        <StarFilledIcon width="1.3rem" fill="info.default" />
      )
    }
    variant={endorsed ? 'primaryPortable' : 'outlinePortable'}
    isDisabled={isDisabled}
    onClick={onClick}
    size={size}
    fontSize="md"
    fontWeight="medium"
    width={{ base: '100%', md: 'auto' }}
  >
    {endorsed ? <Trans>Endorsed</Trans> : <Trans>Endorse</Trans>}
  </Button>
);
