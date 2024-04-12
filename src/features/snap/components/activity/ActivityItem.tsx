import { Box, HStack, Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { formatDistanceToNow } from 'date-fns';
import type { FunctionComponent } from 'react';
import { useCallback } from 'react';

import { StarFilledIcon, WarningIcon } from '../../../../components';
import { EntityName } from '../../../../components/EntityName';
import type { SnapAssertionState } from '../../assertions/store';
import { SnapCurrentStatus } from '../../assertions/types';

export type ActivityItemProps = {
  assertion: SnapAssertionState;
};

export const ActivityItem: FunctionComponent<ActivityItemProps> = ({
  assertion,
}) => {
  const type = useCallback(() => {
    if (assertion.currentStatus === SnapCurrentStatus.Endorsed) {
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <StarFilledIcon width="20px" fill="icon.muted" mr={2} />
          {t`Endorsed by`}
        </span>
      );
    }
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <WarningIcon width="20px" fill="icon.muted" mr={2} />
        {t`Reported by`}
      </span>
    );
  }, [assertion]);

  const reason = useCallback(() => {
    const reasons = [...(assertion.statusReason?.value ?? [])];

    if (!reasons || reasons.length === 0) {
      return '';
    } else if (reasons.length === 1) {
      return `for ${reasons[0]}`;
    }

    const lastItem = reasons.pop();
    const lastItemLink = t`and`;

    return `for ${reasons.join(', ')} ${lastItemLink} ${lastItem}`;
  }, [assertion]);

  return (
    <HStack mb={4} width={'100%'} justifyContent={'space-between'}>
      <HStack>
        <Text>{type()}</Text>
        <EntityName subject={assertion.issuer} isSnap={false} />
        <Text>{reason()}</Text>
      </HStack>
      <Box alignContent={'flex-end'}>
        <Text color={'icon.muted'}>
          {formatDistanceToNow(assertion.issuanceDate, { addSuffix: true })}
        </Text>
      </Box>
    </HStack>
  );
};
