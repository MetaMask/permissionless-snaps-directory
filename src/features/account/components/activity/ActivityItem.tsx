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
import type { AccountAssertionState } from '../../assertions/store';

export type ActivityItemProps = {
  assertion: AccountAssertionState;
};

export const ActivityItem: FunctionComponent<ActivityItemProps> = ({
  assertion,
}) => {
  const isSnap = useMemo(
    () => assertion.accountId.startsWith('snap://'),
    [assertion.accountId],
  );

  const type = useCallback(() => {
    if (isSnap) {
      if (assertion.statusReason?.type === 'Endorse') {
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <StarFilledIcon width="20px" fill="icon.muted" mr={2} />
            {t`Endorsed`}
          </span>
        );
      } else if (assertion.statusReason?.type === 'Malicious') {
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon width="20px" fill="icon.muted" mr={2} />
            {t`Reported`}
          </span>
        );
      }
    } else if (
      assertion.trustworthiness?.filter(
        (trustworthiness) => trustworthiness.level >= 0,
      ).length > 0
    ) {
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <StarFilledIcon width="20px" fill="icon.muted" mr={2} />
          {t`Endorsed`}
        </span>
      );
    } else if (
      assertion.trustworthiness?.filter(
        (trustworthiness) => trustworthiness.level < 0,
      ).length > 0
    ) {
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
    let reasons;

    if (isSnap) {
      reasons = [...(assertion.statusReason?.value || [])];
    } else {
      reasons = assertion.trustworthiness?.map(
        (trustworthiness) => trustworthiness.scope,
      );
    }

    if (!reasons || reasons.length === 0) {
      return '';
    } else if (reasons.length === 1) {
      return `for ${reasons[0]}`;
    }

    const lastItem = reasons.pop();
    const lastItemLink = t`and`;

    return `for ${reasons.join(', ')} ${lastItemLink} ${lastItem}`;
  }, [isSnap, assertion]);

  return (
    <HStack mb={4} width={'100%'} justifyContent={'space-between'}>
      <HStack>
        <Text>{type()}</Text>
        <EntityName subject={assertion.accountId} />
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
