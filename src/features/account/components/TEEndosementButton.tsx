import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { UserCheckIcon } from '../../../components';

export type TEEndosementButtonProps = {
  onClick: () => void;
  endosed: boolean;
};

export const TEEndosementButton: FunctionComponent<TEEndosementButtonProps> = ({
  onClick,
  endosed,
}) => (
  <Button
    leftIcon={endosed ? <UserCheckIcon fill="#ffffff" /> : <UserCheckIcon />}
    variant={endosed ? 'primaryPortable' : 'outlinePortable'}
    isDisabled={endosed}
    onClick={onClick}
    size="sm"
  >
    {endosed ? <Trans>Endosed</Trans> : <Trans>Endose</Trans>}
  </Button>
);
