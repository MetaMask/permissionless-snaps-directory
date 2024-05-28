import { Button, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import type { FunctionComponent } from 'react';

import { IssuersListModal } from '../../../../components';
import { EntityName } from '../../../../components/EntityName';
import { Value } from '../../assertions/enums';
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isEndorsedByMe = endorsements.find(
    (endorsement) =>
      endorsement.issuerId.toLowerCase() === myAddress?.toLowerCase(),
  );

  const endorsementsCount = endorsements.length;
  const maxEndorsementsToDisplay = Math.min(3, endorsementsCount);
  const maxEndorsements = isEndorsedByMe
    ? maxEndorsementsToDisplay - 1
    : maxEndorsementsToDisplay;

  const subject = endorsements[0]?.subjectId ?? '';

  const issuers = endorsements.map((endorsement) => ({
    address: endorsement.issuerId,
    issuanceDate: endorsement.issuanceDate,
  }));

  return (
    <>
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
            <Button onClick={onOpen} variant="link" fontWeight="regular">
              <Text variant="blue">
                {`+ ${endorsementsCount - maxEndorsementsToDisplay} ${t`more`}`}
              </Text>
            </Button>
          )}
        </HStack>
      </VStack>
      {isOpen && (
        <IssuersListModal
          subject={subject}
          isSnap={false}
          assertionType={Value.Endorsement}
          reason={type}
          issuers={issuers}
          isOpen={isOpen}
          onClose={onClose}
        >
          {''}
        </IssuersListModal>
      )}
    </>
  );
};
