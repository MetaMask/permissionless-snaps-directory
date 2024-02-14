import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { DangerIcon } from '.';

export type ReportButtonProps = {
  onClick: () => void;
  reported: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export const ReportButton: FunctionComponent<ReportButtonProps> = ({
  onClick,
  reported,
  isDisabled = false,
  size = 'sm',
}) => (
  <Button
    leftIcon={<DangerIcon fill={reported ? '#FFFFFF' : ''} />}
    variant={reported ? 'primaryPortableError' : 'outlinePortableError'}
    isDisabled={isDisabled}
    size={size}
    onClick={onClick}
  >
    {reported ? <Trans>Reported</Trans> : <Trans>Report</Trans>}
  </Button>
);
