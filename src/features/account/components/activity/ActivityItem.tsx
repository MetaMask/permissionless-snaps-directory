import { Box, HStack, Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { formatDistanceToNow } from 'date-fns';
import type { FunctionComponent } from 'react';
import { useCallback, useMemo } from 'react';

import {
  QuestionIcon,
  StarFilledIcon,
  WarningIcon,
} from '../../../../components';
import { EntityName } from '../../../../components/EntityName';
import { SubjectType, Value } from '../../assertions/enums';
import type { AccountAssertionState } from '../../assertions/store';

export type ActivityItemProps = {
  assertion: AccountAssertionState;
};

export const ActivityItem: FunctionComponent<ActivityItemProps> = ({
  assertion,
}) => {
  const isSnap = useMemo(
    () => assertion.subjectType === SubjectType.Snap,
    [assertion.subjectType],
  );

  const type = useCallback(() => {
    if (isSnap) {
      if (assertion.value === Value.Endorsement) {
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <StarFilledIcon width="20px" fill="icon.muted" mr={2} />
            {t`Endorsed`}
          </span>
        );
      } else if (assertion.value === Value.Dispute) {
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon width="20px" fill="icon.muted" mr={2} />
            {t`Reported`}
          </span>
        );
      }
    } else if (assertion.value === Value.Endorsement) {
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <StarFilledIcon width="20px" fill="icon.muted" mr={2} />
          {t`Endorsed`}
        </span>
      );
    } else if (assertion.value === Value.Dispute) {
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon width="20px" fill="icon.muted" mr={2} />
          {t`Reported`}
        </span>
      );
    }

    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <QuestionIcon width="20px" fill="icon.muted" mr={2} />
        {t`Unknown activity`}
      </span>
    );
  }, [isSnap, assertion]);

  const reason = useCallback(() => {
    const reasons = [...assertion.reasons];

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
        <EntityName
          subject={assertion.subjectId}
          isSnap={assertion.subjectType === SubjectType.Snap}
        />
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
