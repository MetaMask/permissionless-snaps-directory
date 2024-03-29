import { HStack, Text, VStack } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { EntityName } from '../../../../components/EntityName';
import type { AccountAssertionState } from '../../assertions/store';
import type { PKHDid, TrustworthinessScope } from '../../assertions/types';

export type TechnicalExpertiseItemProps = {
  endorsements: AccountAssertionState[];
  type: TrustworthinessScope;
  myDid: PKHDid;
};

export const TechnicalExpertiseItem: FunctionComponent<
  TechnicalExpertiseItemProps
> = ({ endorsements, type, myDid }) => {
  const isEndorsedByMe = endorsements.find(
    (endorsement) => endorsement.issuer.toLowerCase() === myDid.toLowerCase(),
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
        {isEndorsedByMe && (
          <>
            <EntityName
              key={`${myDid}-${type}`}
              subject={myDid}
              title={`${t`you`}`}
            />
            {endorsementsCount > 1 && <Text ml={-1}>,</Text>}
          </>
        )}
        {endorsements.slice(0, maxEndorsements).map((endorsement, index) => (
          <>
            <EntityName
              key={`${endorsement.issuer}-${type}`}
              subject={endorsement.issuer}
            />
            {index < maxEndorsements - 1 && <Text ml={-1}>,</Text>}
          </>
        ))}
        {endorsementsCount > maxEndorsements && (
          <Text ml={0}>{`+ ${
            endorsementsCount - maxEndorsements
          } ${t`more`}`}</Text>
        )}
      </HStack>
    </VStack>
  );
};
