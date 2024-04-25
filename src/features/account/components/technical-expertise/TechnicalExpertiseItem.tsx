import { HStack, Text, VStack } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import type { FunctionComponent } from 'react';

import { EntityName } from '../../../../components/EntityName';
import type { AccountAssertionState } from '../../assertions/store';
import type { TrustworthinessScope } from '../../assertions/types';

export type TechnicalExpertiseItemProps = {
  endorsements: AccountAssertionState[];
  type: TrustworthinessScope;
  myAddress: Address | undefined;
};

export const TechnicalExpertiseItem: FunctionComponent<
  TechnicalExpertiseItemProps
> = ({ endorsements, type, myAddress }) => {
  const isEndorsedByMe = endorsements.find(
    (endorsement) =>
      endorsement.issuerId.toLowerCase() === myAddress?.toLowerCase(),
  );

  const endorsementsCount = endorsements.length;
  const maxEndorsementsToDisplay = Math.min(3, endorsementsCount);
  const maxEndorsements = isEndorsedByMe
    ? maxEndorsementsToDisplay - 1
    : maxEndorsementsToDisplay;

  return (
    <VStack mb={2} alignItems={'start'}>
      <Text fontWeight={'medium'}>{type}</Text>
      <HStack>
        <Text>{t`Endorsed by`}</Text>
        {isEndorsedByMe && myAddress && (
          <>
            <EntityName
              key={`${myAddress}-${type}`}
              subject={myAddress.toLowerCase()}
              isSnap={false}
              title={`${t`you`}`}
            />
            {endorsementsCount > 1 && <Text ml={-1}>,</Text>}
          </>
        )}
        {endorsements.slice(0, maxEndorsements).map((endorsement, index) => (
          <>
            <EntityName
              key={`${endorsement.issuerId}-${index}`}
              subject={endorsement.issuerId}
              isSnap={false}
            />
            {index < maxEndorsements - 1 && <Text ml={-1}>,</Text>}
          </>
        ))}
        {endorsementsCount > maxEndorsements + 1 && (
          <Text ml={0}>{`+ ${
            endorsementsCount - maxEndorsementsToDisplay
          } ${t`more`}`}</Text>
        )}
      </HStack>
    </VStack>
  );
};
