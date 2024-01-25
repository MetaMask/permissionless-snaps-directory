import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { DangerIcon } from '../../../components';

export type AccountReportButtonProps = {
  onClick: () => void;
  reported: boolean;
};

export const AccountReportButton: FunctionComponent<
  AccountReportButtonProps
> = ({ onClick, reported }) => (
  <Button
    variant="outlinePortableError"
    isDisabled={reported}
    size="sm"
    rightIcon={<DangerIcon />}
    onClick={onClick}
  >
    {reported ? <Trans>Reported</Trans> : <Trans>Report</Trans>}
  </Button>
);
