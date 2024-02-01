import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { UserCheckIcon, StarFilledIcon } from '.';

export type EndorseButtonProps = {
  onClick: () => void;
  endorsed: boolean;
};

export const EndorseButton: FunctionComponent<EndorseButtonProps> = ({
  onClick,
  endorsed,
}) => (
  <Button
    leftIcon={endorsed ? <UserCheckIcon fill="#ffffff" /> : <StarFilledIcon />}
    variant={endorsed ? 'primaryPortable' : 'outlinePortable'}
    isDisabled={endorsed}
    onClick={onClick}
    size="sm"
  >
    {endorsed ? <Trans>Endorsed</Trans> : <Trans>Endorse</Trans>}
  </Button>
);