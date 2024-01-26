import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { DangerIcon } from '.';

export type ReportButtonProps = {
  onClick: () => void;
  reported: boolean;
};

export const ReportButton: FunctionComponent<ReportButtonProps> = ({
  onClick,
  reported,
}) => (
  <Button
    leftIcon={<DangerIcon fill={reported ? '#FFFFFF' : ''} />}
    variant={reported ? 'primaryPortableError' : 'outlinePortableError'}
    isDisabled={reported}
    size="sm"
    onClick={onClick}
  >
    {reported ? <Trans>Reported</Trans> : <Trans>Report</Trans>}
  </Button>
);
