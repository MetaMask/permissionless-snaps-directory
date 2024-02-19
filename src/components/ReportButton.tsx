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
  size = 'md',
}) => (
  <Button
    leftIcon={<DangerIcon width="1.3rem" fill={reported ? '#FFFFFF' : ''} />}
    variant={reported ? 'primaryPortableError' : 'outlinePortableError'}
    isDisabled={isDisabled}
    size={size}
    fontSize="md"
    fontWeight="medium"
    onClick={onClick}
    width={{ base: '100%', md: 'auto' }}
  >
    {reported ? <Trans>Reported</Trans> : <Trans>Report</Trans>}
  </Button>
);
